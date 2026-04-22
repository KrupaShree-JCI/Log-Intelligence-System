namespace LogIntelligence.Models
{
    public class Log
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string Level { get; set; }
        public string Service { get; set; }
        public string Event { get; set; }
        public string? OrderId { get; set; }
        public string? UserId { get; set; }
        public double? Amount { get; set; }
        public string Status { get; set; }
        public int ResponseTime { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
