using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Models.Base
{
    [JsonDerivedType(typeof(InfoBlock))]
    [JsonDerivedType(typeof(QuestionBlock))]
    public class BlockBase
    {
        public string Title { get; set; }
        public string Subtitle { get; set; }

        public string ButtonNext { get; set; }
        public string ButtonPrevious { get; set; }
    }
}
