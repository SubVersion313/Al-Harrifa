using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using AlHarrifa.Models;
using AlHarrifa.Data;

namespace AlHarrifa.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProductsController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [AllowAnonymous]
        [HttpGet("api/products")]
        public IActionResult GetProducts()
        {
            var products = _context.Products
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.Category,
                    p.Details,
                    p.CreatedAt
                })
                .ToList();
            return Json(products);
        }

        [AllowAnonymous]
        [HttpGet("api/products/{category}")]
        public IActionResult GetProductsByCategory(string category)
        {
            var products = _context.Products
                .Where(p => p.Category == category)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.Category,
                    p.Details,
                    p.CreatedAt
                })
                .ToList();
            return Json(products);
        }

        [AllowAnonymous]
        [HttpGet("api/products/top")]
        public IActionResult GetTopProducts()
        {
            var categories = _context.Products.Select(p => p.Category).Distinct();
            var result = new Dictionary<string, List<object>>();

            foreach (var category in categories)
            {
                var products = _context.Products
                    .Where(p => p.Category == category)
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(5)
                    .Select(p => new {
                        p.Id,
                        p.Name,
                        p.Price,
                        p.ImageUrl,
                        p.Category,
                        p.Details,
                        p.CreatedAt,
                        SellerName = p.Seller.NameUser
                    })
                    .ToList();
                
                result[category] = products.Cast<object>().ToList();
            }

            return Json(result);
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            return View(_context.Products.ToList());
        }

        [AllowAnonymous]
        public IActionResult Details(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return View(product);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            ViewBag.Categories = _context.Categories.ToList();
            return View();
        }

        [Authorize]
        [HttpPost("api/products/upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            // Validate file type
            var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif" };
            if (!allowedTypes.Contains(file.ContentType.ToLower()))
                return BadRequest("Invalid file type. Only JPEG, PNG and GIF are allowed.");

            // Create uploads directory if it doesn't exist
            var uploadsDir = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsDir))
                Directory.CreateDirectory(uploadsDir);

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsDir, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Json(new { url = $"/uploads/{fileName}" });
        }

        [Authorize]
        [HttpPost("api/products")]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            product.SellerId = userId;
            product.CreatedAt = DateTime.UtcNow;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Details), new { id = product.Id }, product);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            ViewBag.Categories = _context.Categories.ToList();
            return View(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Product product)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Categories = _context.Categories.ToList();
                return View(product);
            }
            _context.Products.Update(product);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return View(product);
        }

        [HttpPost, ActionName("Delete")]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        [AllowAnonymous]
        [HttpGet("api/products")]
        public IActionResult GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 12, [FromQuery] string category = null)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(p => p.Category == category);

            var totalItems = query.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var products = query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.Category,
                    p.Details,
                    p.CreatedAt,
                    SellerName = p.Seller.NameUser
                })
                .ToList();

            return Json(new {
                products,
                pagination = new {
                    currentPage = page,
                    totalPages,
                    totalItems,
                    pageSize
                }
            });
        }
    }
}