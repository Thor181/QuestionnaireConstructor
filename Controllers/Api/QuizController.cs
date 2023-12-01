using Microsoft.AspNetCore.Mvc;
using QuestionnaireConstructor.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Controllers.Api
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class QuizController : BaseController
    {
        public override string ViewPath => throw new NotImplementedException();

        [HttpPost]
        public bool Save(QuizData data)
        {
            
            var JUST_BREAKPOINT = string.Empty;

            return true;
        }
    }
}
