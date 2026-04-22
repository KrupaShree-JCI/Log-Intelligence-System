using LogIntelligence.Data;
using LogIntelligence.Helpers;
using LogIntelligence.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});




builder.Services.AddControllers();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<LogService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddHttpClient<InsightsService>();

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddHttpClient();



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Log Intelligence API",
        Version = "v1"
    });

   
    options.AddSecurityDefinition("Username", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Username",
        Type = SecuritySchemeType.ApiKey,
        Description = "Enter Username"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Username"
                }
            },
            new string[] {}
        }
    });
});
var app = builder.Build();
app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Log Intelligence API v1");
    options.RoutePrefix = "swagger";
});
app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
