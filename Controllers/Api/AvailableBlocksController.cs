using Microsoft.AspNetCore.Mvc;
using QuestionnaireConstructor.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Controllers.Api
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class AvailableBlocksController : Controller
    {
        [HttpGet]
        public IEnumerable<BlockBase> Get()
        {
            var blocks = new List<BlockBase>();

            blocks.Add(new InfoBlock());
            blocks.Add(new QuestionBlock());

            return blocks;
        }
    }

}
