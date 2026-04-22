namespace LogIntelligence.Helpers
{
    public static class RoleHelper
    {
        public static bool HasAccess(string role, string feature)
        {
            return feature switch
            {
                "UploadLogs" => role == "Admin" || role == "Analytics" || role == "Viewer",

                "KPI" => role == "Admin" || role == "Analytics",

                "Charts" => role == "Admin" || role == "Analytics",

                "AI" => role == "Admin" || role == "Analytics",

                "RawLogs" => role == "Admin" || role == "Viewer",

                _ => false
            };
        }
    }
}