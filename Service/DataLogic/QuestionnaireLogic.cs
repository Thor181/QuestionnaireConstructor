using QuestionnaireConstructor.Models.Api;
using QuestionnaireConstructor.Models.Database;
using QuestionnaireConstructor.Service.DataLogic.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Service.DataLogic
{
    public class QuestionnaireLogic : BaseLogic<Questionnaire>
    {
        public QuestionnaireLogic(QADBContext dbContext) : base(dbContext)
        {
        }

        public async Task AddFromDataAsync(QuizData data)
        {
            var entry = new Questionnaire
            {
                Data = data.Data,
            };

            await AddInstantAsync(entry);
        }
    }
}
