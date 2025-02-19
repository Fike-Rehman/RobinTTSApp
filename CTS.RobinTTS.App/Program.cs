using RobinTTSApp.Models;
using RobinTTSApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Load user secrets first (if in Development)
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

// Register the configuration sections
builder.Services.Configure<AppSecrets>(builder.Configuration.GetSection("AppSecrets"));
builder.Services.Configure<Dictionary<string, ElevenLabsVoiceProfile>>(builder.Configuration.GetSection("ElevenLabsVoiceProfiles"));

// Register application services
builder.Services.AddSingleton<ElevenLabsService>();

// Configure CORS
ConfigureCors(builder.Services);

// Build the application AFTER all service registrations
var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();
app.Run();

/// <summary>
/// Configures CORS policy for the application.
/// </summary>
void ConfigureCors(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });
}
