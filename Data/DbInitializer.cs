using AlHarrifa.Data;
using AlHarrifa.Models;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();
        if (!context.Users.Any(u => u.Email == "admin@site.com"))
        {
            var admin = new User
            {
                NameUser = "Admin",
                Email = "admin@site.com",
                IsAdmin = true,
                CreatedAt = DateTime.Now
            };
            admin.SetPassword("adminpass");
            context.Users.Add(admin);
        }
        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { Name = "homeDecor", Description = "Home Decor" },
                new Category { Name = "artCollectibles", Description = "Art & Collectibles" },
                new Category { Name = "accessories", Description = "Accessories" }
            );
        }
        context.SaveChanges();
    }
}