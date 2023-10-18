using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Controllers
{
    public abstract class BaseController : Controller
    {
        public abstract string ViewPath { get; }


    }
}
