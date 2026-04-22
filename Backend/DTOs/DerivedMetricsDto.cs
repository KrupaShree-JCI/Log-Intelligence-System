namespace LogIntelligence.DTOs
{
    public class DerivedMetricsDto
    {
        public Dictionary<string,double> ErrorDistributionByService { get; set; }
        public string DominantService { get; set; }
        public string ErrorType { get; set; }
        public string Trend { get; set; }
        public string SystemService { get; set; }

        public double ImpactScore { get; set; }
    }
}
