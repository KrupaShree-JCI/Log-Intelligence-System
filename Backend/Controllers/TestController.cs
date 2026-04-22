using Microsoft.AspNetCore.Mvc;
using LogIntelligence.Services;

[ApiController]
[Route("api/test-ai")]
public class TestController : ControllerBase
{
    private readonly TestService _testService;

    public TestController(TestService testService)
    {
        _testService = testService;
    }

    [HttpGet]
    public async Task<IActionResult> TestAI()
    {
        var result = await _testService.CallModelAsync();
        return Content (result,"application/json");
    }
}