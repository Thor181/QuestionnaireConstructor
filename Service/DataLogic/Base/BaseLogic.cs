using QuestionnaireConstructor.Models.Database;
using QuestionnaireConstructor.Models.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireConstructor.Service.DataLogic.Base
{
    public class BaseLogic<T> : IDisposable where T : class, IDbEntity
    {
        private bool _disposed = false; 
        protected QADBContext DBContext { get; set; }

        public BaseLogic(QADBContext dbContext)
        {
            DBContext = dbContext;
        }

        public virtual async Task AddInstantAsync(T entity)
        {
            await DBContext.AddAsync(entity);
            await SaveChangesAsync();
        }

        public virtual async Task AddAsync(T entity)
        {
            await DBContext.AddAsync(entity);
        }

        public virtual async Task SaveChangesAsync()
        {
            await DBContext.SaveChangesAsync();
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
