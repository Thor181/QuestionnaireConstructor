﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Controllers
{
    public class MainController : BaseController
    {
        public override string ViewPath => "~/Views/Main/MainView.cshtml";
    }
}
