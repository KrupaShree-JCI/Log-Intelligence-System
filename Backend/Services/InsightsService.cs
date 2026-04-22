using System.Text;
using System.Text.Json;
using LogIntelligence.DTOs;
using LogIntelligence.Prompts;
using Microsoft.Extensions.Configuration;
namespace LogIntelligence.Services
{
    public class InsightsService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public InsightsService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<InsightDto> GenerateInsightsAsync(InsightInputDto input)
        {
            var apiKey = _config["HuggingFace:ApiKey"];

            var prompt = InsightPromptBuilder.Build(input);

        

            var requestBody = new
            {
                model = _config["HuggingFace:Model"],
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.2
            };

            var request = new HttpRequestMessage(
                HttpMethod.Post,
                _config["HuggingFace:ApiUrl"]
            );

            request.Headers.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _config["HuggingFace:ApiKey"]);

            request.Content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            try
            {
                var response = await _httpClient.SendAsync(request);
                var raw = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    return GetFallback();

                using var doc = JsonDocument.Parse(raw);

                var content = doc
                    .RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                content = ExtractJson(content);

                var result = JsonSerializer.Deserialize<InsightDto>(
                    content,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                return result ?? GetFallback();
            }
            catch
            {
                return GetFallback();
            }
        }

        private string ExtractJson(string content)
        {
            var start = content.IndexOf("{");
            var end = content.LastIndexOf("}");

            if (start >= 0 && end > start)
                return content.Substring(start, end - start + 1);

            return content;
        }

        private InsightDto GetFallback()
        {
            return new InsightDto
            {
                Summary = "AI unavailable",
                RootCause = "Unknown",
                SystemPhase = "Unknown",
                Reasons = new List<string> { "AI service failed" },
                Suggestions = new List<string> { "Check AI connectivity" }
            };
        }
    }
}
