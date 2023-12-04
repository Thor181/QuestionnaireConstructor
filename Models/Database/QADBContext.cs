using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Models.Configuration.Context.Models;

namespace QuestionnaireConstructor.Models.Database
{
    public partial class QADBContext : DbContext
    {
        public QADBContext()
        {
        }

        public QADBContext(DbContextOptions<QADBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Questionnaire> Questionnaires { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new QuestionnaireConfiguration());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
