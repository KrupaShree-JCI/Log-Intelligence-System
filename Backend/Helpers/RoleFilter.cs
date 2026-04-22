using LogIntelligence.Data;
using LogIntelligence.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class RoleFilter : IAuthorizationFilter
{
    private readonly string _feature;
    private readonly AppDbContext _context;

   
    public RoleFilter(AppDbContext context, string feature)
    {
        _context = context;
        _feature = feature;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var username = context.HttpContext.Request.Headers["Username"].ToString();

        if (string.IsNullOrEmpty(username))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var user = _context.Users.FirstOrDefault(u => u.Username == username);

        if (user == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        if (!RoleHelper.HasAccess(user.Role, _feature))
        {
            context.Result = new ForbidResult();
        }
    }
}