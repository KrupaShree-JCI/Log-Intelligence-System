namespace LogIntelligence.DTOs
{
    public class DashboardResponseDto
    {

        public KpiDto Kpis { get; set; }
        public DerivedMetricsDto DerivedMetrics { get; set; }
        public RiskDto Risk { get; set; }
    }
}
