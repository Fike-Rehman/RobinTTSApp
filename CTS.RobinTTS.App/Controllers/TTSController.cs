using Microsoft.AspNetCore.Mvc;
using RobinTTSApp.Models;
using RobinTTSApp.Services;
using System.Collections.Concurrent;

namespace RobinTTSApp.Controllers
{
    [Route("api/tts")]
    [ApiController]
    public class TTSController : ControllerBase
    {
        private readonly ILogger<TTSController> _logger;
        private readonly ElevenLabsService _elevenLabsService;

        private static readonly ConcurrentDictionary<string, byte[]> _audioCache = new();

        public TTSController(ILogger<TTSController> logger, ElevenLabsService elevenLabsService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _elevenLabsService = elevenLabsService ?? throw new ArgumentNullException(nameof(elevenLabsService));
        }

        /// <summary>
        /// Generate audio from the given text script and voice name.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
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

                // TODO: Save the audio file to a backend storage here if needed. Curently we are storing it in memory.

                var audioId = Guid.NewGuid().ToString();

                // Store the audio in memory
                _audioCache[audioId] = audioBytes;

                return Ok(new { Message = "Audio generated successfully", AudioId = audioId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate audio file.");
                return StatusCode(500, "Failed to generate audio file.");
            }
        }

        /// <summary>
        /// Stream the audio file with the given audioId.
        /// </summary>
        /// <param name="audioId"></param>
        /// <returns></returns>
        [HttpGet("stream/{audioId}")]
        public IActionResult StreamAudio(string audioId)
        {
            if (_audioCache.TryGetValue(audioId, out var audioBytes))
            {
                return File(audioBytes, "audio/wav");
            }

            return NotFound("Audio not found.");
        }

        /// <summary>
        /// Download the audio file with the given audioId.
        /// </summary>
        /// <param name="audioId"></param>
        /// <returns></returns>
        [HttpGet("download/{audioId}")]
        public IActionResult DownloadAudio(string audioId)
        {
            if (_audioCache.TryGetValue(audioId, out var audioBytes))
            {
                return File(audioBytes, "audio/wav", $"{audioId}.wav");
            }

            return NotFound("Audio not found.");
        }
    }
}
