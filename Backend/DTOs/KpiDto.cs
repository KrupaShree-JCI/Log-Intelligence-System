namespace LogIntelligence.DTOs
{
    public class KpiDto
    {
        public int TotalOrders { get; set; }
        public double FailureRate { get; set; }
        public double ErrorRate { get; set; }
        public double AvgResponseTime { get; set; }
    }
}
