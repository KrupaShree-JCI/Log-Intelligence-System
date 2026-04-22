using Microsoft.AspNetCore.Mvc;

namespace LogIntelligence.Controllers
{
    public class InsightController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
