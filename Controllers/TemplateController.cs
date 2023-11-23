using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Controllers
{
    public class TemplateController : BaseController
    {
        public override string ViewPath => "~/Views/Main/TemplateView.cshtml";

        public void Foo([FromForm] IFormFile formFile)
        {
            var c = "";
        }
    }
}
