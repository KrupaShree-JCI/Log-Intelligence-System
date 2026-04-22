
using Microsoft.EntityFrameworkCore;
using LogIntelligence.Models;
namespace LogIntelligence.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Log> Logs { get; set; }
    public DbSet<User> Users { get; set; }
}