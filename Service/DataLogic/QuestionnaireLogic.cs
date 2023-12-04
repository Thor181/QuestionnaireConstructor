using QuestionnaireConstructor.Models.Database;
using QuestionnaireConstructor.Service.DataLogic.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Service.DataLogic
{
    public class QuestionnaireLogic : BaseLogic
    {
        public QuestionnaireLogic(QADBContext dbContext) : base(dbContext)
        {
        }
    }
}
