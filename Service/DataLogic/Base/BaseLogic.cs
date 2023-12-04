using QuestionnaireConstructor.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Service.DataLogic.Base
{
    public class BaseLogic : IDisposable
    {
        private bool _disposed = false; 
        protected QADBContext DBContext { get; set; }

        public BaseLogic(QADBContext dbContext)
        {
            DBContext = dbContext;
        }

        #region Dispose
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    DBContext?.Dispose();
                }

                _disposed = true;
            }
        } 
        #endregion
    }
}
