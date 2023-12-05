using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuestionnaireConstructor.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Models.Configuration.Context.Models
{
    public class QuestionnaireConfiguration : IEntityTypeConfiguration<Questionnaire>
    {
        public void Configure(EntityTypeBuilder<Questionnaire> builder)
        {
            builder.ToTable("Questionnaire");

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");

            builder.Property(e => e.Data).HasColumnName("data");

            builder.Property(e => e.Description)
                .HasMaxLength(250)
                .HasColumnName("description");

            builder.Property(e => e.Title)
                .HasMaxLength(50)
                .HasColumnName("title");

            builder.Property(e => e.UserId).HasColumnName("userId");
        }
    }
}
