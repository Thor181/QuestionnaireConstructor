
using Microsoft.EntityFrameworkCore;
using QuestionnaireConstructor.Models.Database;
using QuestionnaireConstructor.Service.DataLogic;

namespace QuestionnaireConstructor
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var appSettings = builder.Environment.IsDevelopment()
                               ? "appsettings.Development.json"
                               : "appsettings.json";

            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile(appSettings)
                .Build();

            builder.Services.AddDbContext<QADBContext>(op => { op.UseSqlServer(configuration.GetConnectionString("QADB")); });
            builder.Services.AddScoped<QuestionnaireLogic>();

            builder.Services.AddControllersWithViews();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllerRoute("default", "{controller=Main}/{action=Index}/{id?}");

            app.Run();
        }
    }

}
