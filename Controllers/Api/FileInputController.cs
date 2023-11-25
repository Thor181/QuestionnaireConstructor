using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Controllers.Api
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class FileInputController : BaseController
    {
        public override string ViewPath => throw new NotImplementedException();

        [HttpPost]
        public async Task<string> SaveAsync(IFormFile file)
        {
            if (file.Length < 0)
                return string.Empty;

            using var stream = file.OpenReadStream();

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            var guid = Guid.NewGuid().ToString().Replace("-", "");
            var newName = $"{guid}{extension}";

            var relativePath = Path.Combine("userimages", newName);
            var path = Path.Combine(Environment.CurrentDirectory, "wwwroot", relativePath);

            using var fs = new FileStream(path, FileMode.OpenOrCreate);

            await file.CopyToAsync(fs);

            return relativePath;
        }

    }
}
