using LogIntelligence.Data;
using LogIntelligence.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace LogIntelligence.Services
{
    public class LogService
    {
        private readonly AppDbContext _context;

        public LogService(AppDbContext context)
        {
            _context = context;
        }

        public async Task ProcessLogFile(IFormFile file)
        {

            _context.Logs.RemoveRange(_context.Logs);
            await _context.SaveChangesAsync();

            using var stream = file.OpenReadStream();

            var jsonDoc = await JsonDocument.ParseAsync(stream);

            var logsArray = jsonDoc.RootElement.GetProperty("logs");

            var logs = new List<Log>();

            foreach (var item in logsArray.EnumerateArray())
            {
                var log = new Log
                {
                    Timestamp = item.GetProperty("timestamp").GetDateTime(),
                    Level = item.GetProperty("level").GetString(),
                    Service = item.GetProperty("service").GetString(),
                    Event = item.GetProperty("event").GetString(),
                    OrderId = item.TryGetProperty("orderId", out var orderId) ? orderId.GetString() : null,
                    UserId = item.TryGetProperty("userId", out var userId) ? userId.GetString() : null,
                    Amount = item.TryGetProperty("amount", out var amount) && amount.ValueKind != JsonValueKind.Null
                                ? amount.GetDouble()
                                : null,
                    Status = item.GetProperty("status").GetString(),
                    ResponseTime = item.GetProperty("responseTime").GetInt32(),
                    ErrorMessage = item.TryGetProperty("errorMessage", out var error)
                                ? error.GetString()
                                : null
                };

                logs.Add(log);
            }

            await _context.Logs.AddRangeAsync(logs);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Log>> GetLogsAsync(string level, string service,string search)
        {

            var query = _context.Logs.AsQueryable();

            if (!string.IsNullOrEmpty(level))
            {
                query = query.Where(x => x.Level == level);
            }

            if (!string.IsNullOrEmpty(service))
            {
                query = query.Where(x => x.Service == service);
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.Event.Contains(search));
            }
            return await query.OrderByDescending(l => l.Timestamp).ToListAsync();
        }
    }
}
