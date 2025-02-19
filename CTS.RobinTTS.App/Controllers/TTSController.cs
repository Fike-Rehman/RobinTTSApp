using Microsoft.AspNetCore.Mvc;
using RobinTTSApp.Models;
using RobinTTSApp.Services;

namespace RobinTTSApp.Controllers
{
    [Route("api/tts")]
    [ApiController]
    public class TTSController : ControllerBase
    {
        private readonly ILogger<TTSController> _logger;
        private readonly ElevenLabsService _elevenLabsService;

        private readonly string _audioOutputPath = Path.Combine(Directory.GetCurrentDirectory(), "GeneratedAudio");

        public TTSController(ILogger<TTSController> logger, ElevenLabsService elevenLabsService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _elevenLabsService = elevenLabsService ?? throw new ArgumentNullException(nameof(elevenLabsService));

            if (!Directory.Exists(_audioOutputPath))
            {
                Directory.CreateDirectory(_audioOutputPath);
            }
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateAudio([FromBody] TTSRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Script) || string.IsNullOrWhiteSpace(request.VoiceName))
            {
                return BadRequest("Text and VoiceName are required.");
            }

            try 
            {
                var audioBytes = await _elevenLabsService.GenerateAudioAsync(request.Script, request.VoiceName);
                if (audioBytes == null)
                {
                    return StatusCode(500, "Failed to generate audio file.");
                }

                var fileName = $"{Guid.NewGuid()}.wav";
                var filePath = Path.Combine(_audioOutputPath, fileName);

                await System.IO.File.WriteAllBytesAsync(filePath, audioBytes);

                _logger.LogInformation($"Audio file saved at {filePath}");

                // return file stream to the front end
                // return File(audioBytes, "audio/wav", "generated_audio.wav");
                // for now we are just storing the audio file on the server
                return Ok(new { Message = "Audio generated successfully", FilePath = filePath });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate audio file.");
                return StatusCode(500, "Failed to generate audio file.");
            }
        }
    }
}
