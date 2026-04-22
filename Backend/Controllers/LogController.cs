using LogIntelligence.Services;
using Microsoft.AspNetCore.Mvc;
using LogIntelligence.Helpers;
using LogIntelligence.Data;

namespace LogIntelligence.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly LogService _logService;
        private readonly AppDbContext _context;

        public LogsController(LogService logService, AppDbContext context)
        {
            _logService = logService;
            _context = context;
        }

        [HttpPost("upload")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "UploadLogs" })]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            
            var username = Request.Headers["Username"].ToString();

            if (string.IsNullOrEmpty(username))
                return Unauthorized("Username missing");

            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return Unauthorized("User not found");

            await _logService.ProcessLogFile(file);

            return Ok(new { message = "Logs Uploaded Successfully" });
        }


        [HttpGet("filter")]
        [TypeFilter(typeof(RoleFilter), Arguments = new object[] { "RawLogs" })]
        public async Task<IActionResult> GetLogs(
             [FromQuery] string? level, [FromQuery] string? service, [FromQuery] string? search
            )
        {
            
            var logs=await _logService.GetLogsAsync(level, service,search);
            return Ok(logs);
        }
    }
}
