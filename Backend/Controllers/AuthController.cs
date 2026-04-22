using LogIntelligence.DTOs;
using LogIntelligence.Services;
using Microsoft.AspNetCore.Mvc;
using LogIntelligence.Models;
using Microsoft.EntityFrameworkCore;
using LogIntelligence.Data;


[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly AppDbContext _context;

    public AuthController(AuthService authService, AppDbContext context)
    {
        _authService = authService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        var user = await _authService.ValidateUser(request.Username, request.Password);

        if (user == null)
            return Unauthorized("Invalid credentials");

        return Ok(new
        {
            username = user.Username,
            role = user.Role
        });
    }

   
}
