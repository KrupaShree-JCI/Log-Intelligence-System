using Microsoft.AspNetCore.Mvc;
using LogIntelligence.Services;
using LogIntelligence.DTOs;
using LogIntelligence.Helpers;

namespace LogIntelligence.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InsightController : ControllerBase
    {
        private readonly InsightsService _insightService;
        private readonly DashboardService _dashboardService;

        public InsightController(
            InsightsService insightService,
            DashboardService dashboardService)
        {
            _insightService = insightService;
            _dashboardService = dashboardService;
        }

       
        [HttpGet]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "AI" })]
        public async Task<IActionResult> GetInsights()
        {
            var kpis = await _dashboardService.GetKpisAsync();
            var derived = await _dashboardService.GetDerivedMetricsAsync();
            var risk = await _dashboardService.GetRiskAsync(kpis, derived);

            var input = new InsightInputDto
            {
                Kpis = kpis,
                DerivedMetrics = derived,
                Risk = risk
            };

            var result = await _insightService.GenerateInsightsAsync(input);

            return Ok(result);
        }
    }
}
