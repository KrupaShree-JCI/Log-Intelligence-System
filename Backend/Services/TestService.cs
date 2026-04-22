using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

public class TestService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public TestService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<string> CallModelAsync()
    {
        var apiKey = _config["HuggingFace:ApiKey"];

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        var requestBody = new
        {
            model = "arcee-ai/Trinity-Large-Thinking:featherless-ai",
            messages = new[]
            {
                new {
                    role = "user",
                    content = "Say hello from AI"
                }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(requestBody),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync(
            "https://router.huggingface.co/v1/chat/completions",
            content
        );

        var result = await response.Content.ReadAsStringAsync();

        return result;
    }
}
