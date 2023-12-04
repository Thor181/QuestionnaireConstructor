﻿using System;
using System.Collections.Generic;

namespace QuestionnaireConstructor.Models.Database
{
    public partial class Questionnaire
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Data { get; set; } = null!;
    }
}
