using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using QuestionnaireConstructor.Models.Api;
using QuestionnaireConstructor.Models.Database;
using QuestionnaireConstructor.Service.DataLogic;
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
        public async Task<bool> Save(QuizData data)
        {
            using var questionnaireLogic = HttpContext.RequestServices.GetRequiredService<QuestionnaireLogic>();
            await questionnaireLogic.AddFromDataAsync(data);

            return true;
        }
    }
}
