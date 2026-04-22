using LogIntelligence.Helpers;
using LogIntelligence.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data;


namespace LogIntelligence.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        


        [HttpGet("kpis")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "KPI" })]
        public async Task<IActionResult> GetKpis()

        {
            var result = await _dashboardService.GetKpisAsync();
            return Ok(result);
        }


        [HttpGet("severity")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "Charts" })]
        public async  Task<IActionResult> GetSeverity()

        {

            var result = await _dashboardService.GetLogsBySeverityAsync();
            return Ok(result);
        }

        [HttpGet("error-trend")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "Charts" })]
        public async Task<IActionResult> GetErrorTrend()
        {

            var result = await _dashboardService.GetErrorTrendAsync();
            return Ok(result);
        }

        [HttpGet("order-trend")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "Charts" })]
        public async Task<IActionResult> GetOrderTrend()
        {

            var result =await _dashboardService.GetOrderTrendAsync();
            return Ok(result);
        }

        [HttpGet("top-errors")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "Charts" })]
        public async Task<IActionResult> GetTopErrors()
        {
            var result = await _dashboardService.GetTopErrorsAsync();
            return Ok(result);
        }

        [HttpGet("dashboard")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "KPI" })]
        public async Task<IActionResult> GetDashboard()
        {
            var kpis = await _dashboardService.GetKpisAsync();

            var derived = await _dashboardService.GetDerivedMetricsAsync();

            var risk = await _dashboardService.GetRiskAsync(kpis, derived);

           
            return Ok(new
            {
                kpis,
                derivedMetrics = derived,
                risk
            });
        }

    }


}