namespace LogIntelligence.DTOs
{
    public class InsightInputDto
    {
        public  KpiDto Kpis{ get; set; }
        public DerivedMetricsDto DerivedMetrics { get; set; }
       
        public RiskDto Risk { get; set; }
        
    }
}