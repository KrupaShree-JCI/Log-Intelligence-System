using LogIntelligence.Data;
using LogIntelligence.DTOs;
using Microsoft.EntityFrameworkCore;
namespace LogIntelligence.Services
{
    public class DashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<KpiDto> GetKpisAsync()
        {
            var totalLogs = await _context.Logs.CountAsync();

            var totalOrders = await _context.Logs
                .CountAsync(l => l.OrderId != null);

            var failedLogs = await _context.Logs
                .CountAsync(l => l.Status == "FAILED");

            var errorLogs = await _context.Logs
                .CountAsync(l => l.Level == "ERROR");

            var avgResponseTime = totalLogs > 0
                ? await _context.Logs.AverageAsync(l => l.ResponseTime)
                : 0;

            return new KpiDto
            {
                TotalOrders = totalOrders,
                FailureRate = totalLogs == 0
                    ? 0
                    : (double)failedLogs / totalLogs * 100,

                ErrorRate = totalLogs == 0
                    ? 0
                    : (double)errorLogs / totalLogs * 100,

                AvgResponseTime = avgResponseTime
            };
        }
        public async Task<List<SeverityDto>> GetLogsBySeverityAsync()
        {
            return await _context.Logs
                .GroupBy(l => l.Level)
                .Select(g => new SeverityDto
                {
                    Level = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();
        }

        public async Task<List<ErrorTrendDto>> GetErrorTrendAsync()
        {
            var grouped = await _context.Logs
                .Where(l => l.Level == "ERROR")
                .GroupBy(l => new
                {
                    l.Timestamp.Year,
                    l.Timestamp.Month,
                    l.Timestamp.Day,
                    l.Timestamp.Hour,
                    l.Timestamp.Minute
                })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    g.Key.Day,
                    g.Key.Hour,
                    g.Key.Minute,
                    ErrorCount = g.Count()
                })
                .ToListAsync();

            return grouped
                .Select(x => new ErrorTrendDto
                {
                    Time = new DateTime(
                        x.Year,
                        x.Month,
                        x.Day,
                        x.Hour,
                        x.Minute,
                        0
                    ),
                    ErrorCount = x.ErrorCount
                })
                .OrderBy(x => x.Time)
                .ToList();
        }
        public async Task<List<OrderTrendDto>> GetOrderTrendAsync()
        {

            var logs = await _context.Logs
                .Where(l => l.OrderId != null)
                .ToListAsync();


            return logs
                .GroupBy(l => new
                {
                    l.Timestamp.Year,
                    l.Timestamp.Month,
                    l.Timestamp.Day,
                    l.Timestamp.Hour,
                    l.Timestamp.Minute
                })
                .Select(g => new OrderTrendDto
                {
                    Time = new DateTime(
                        g.Key.Year,
                        g.Key.Month,
                        g.Key.Day,
                        g.Key.Hour,
                        g.Key.Minute,
                        0
                    ),
                    OrderCount = g.Count(l=>l.OrderId!=null),
                    FailureCount=g.Count(l=>l.Level=="ERROR")
                })
                .OrderBy(x => x.Time)
                .ToList();
        }

        public async Task<List<TopErrorDto>> GetTopErrorsAsync()
        {

            var errorLogs = await _context.Logs
                .Where(l => l.Level == "ERROR" && l.ErrorMessage != null)
                .ToListAsync();


            return errorLogs
                .GroupBy(l => l.ErrorMessage)
                .Select(g => new TopErrorDto
                {
                    ErrorMessage = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(x => x.Count)
                .Take(5)
                .ToList();
        }


        public async Task<DerivedMetricsDto> GetDerivedMetricsAsync()
        {
            var logs = await _context.Logs.ToListAsync();

            var totalLogs = logs.Count;
            var errorLogs = logs.Where(l => l.Level == "ERROR").ToList();

            var distribution = errorLogs
                .GroupBy(l => l.Service)
                .ToDictionary(
                    g => g.Key,
                    g => errorLogs.Count == 0 ? 0 : (double)g.Count() / errorLogs.Count * 100
                );

            var dominantService = distribution.Any()
                ? distribution.OrderByDescending(x => x.Value).First().Key
                : "Unknown";

            var errorType = errorLogs
                .GroupBy(l => l.Event)
                .OrderByDescending(g => g.Count())
                .FirstOrDefault()?.Key ?? "Unknown";

            string trend = errorLogs.Count > 10 ? "Increasing" : "Stable";

            string systemState = errorLogs.Count switch
            {
                < 5 => "Healthy",
                < 15 => "Degrading",
                _ => "Incident"
            };

            double impactScore = totalLogs == 0
                ? 0
                : (double)errorLogs.Count / totalLogs;

            return new DerivedMetricsDto
            {
                ErrorDistributionByService = distribution,
                DominantService = dominantService,
                ErrorType = errorType,
                Trend = trend,
                SystemService = systemState,
                ImpactScore = Math.Round(impactScore, 2)
            };
        }

        public Task<RiskDto> GetRiskAsync(KpiDto kpis, DerivedMetricsDto derived)
        {
            double score = 0;

            score += kpis.FailureRate * 0.4;
            score += kpis.ErrorRate * 0.3;
            score += (kpis.AvgResponseTime / 1000.0) * 0.1;
            score += derived.ImpactScore * 100 * 0.2;

            if (derived.SystemService == "Incident")
                score += 10;
            else if (derived.SystemService== "Degrading")
                score += 5;

            string level = score switch
            {
                < 30 => "Low",
                < 60 => "Medium",
                < 80 => "High",
                _ => "Critical"
            };

            var result = new RiskDto
            {
                RiskScore = Math.Round(score, 2),
                RiskLevel = level
            };

            return Task.FromResult(result); 
        }
    }
}