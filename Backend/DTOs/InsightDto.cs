namespace LogIntelligence.DTOs

{
    public class InsightDto
    {
        public string Summary { get; set; }
        public string RootCause { get; set; }
        public string SystemPhase{ get; set; }
        public List<string> Reasons { get; set; }
        public List<string> Suggestions { get; set; }
    }
}
 