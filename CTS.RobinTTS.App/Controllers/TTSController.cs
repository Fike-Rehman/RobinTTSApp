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

      // private static readonly ConcurrentDictionary<string, byte[]> _audioCache = new();

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

                // TODO: save the audio to a backend store here if needed. Currently, we are just returning the audio as a stream.
                // var audioId = Guid.NewGuid().ToString();
                // _audioCache[audioId] = audioBytes;
                //  return Ok(new { Message = "Audio generated successfully", AudioId = audioId });
                
                
                // Return audio as a stream without saving to disk
                return File(audioBytes, "audio/wav", $"{Guid.NewGuid()}.wav");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate audio file.");
                return StatusCode(500, "Failed to generate audio file.");
            }
        }

        // TODO: Implement the following endpoints if needed. This is for cases where the audio needs to be saved to a backend store.

        ///// <summary>
        ///// Stream the previously generated audio file with the given audioId.
        ///// </summary>
        ///// <param name = "audioId" ></ param >
        ///// < returns ></ returns >
        //[HttpGet("stream/{audioId}")]
        //public IActionResult StreamAudio(string audioId)
        //{
        //    if (_audioCache.TryGetValue(audioId, out var audioBytes))
        //    {
        //        return File(audioBytes, "audio/wav");
        //    }

        //    return NotFound("Audio not found.");
        //}

        ///// <summary>
        ///// Download the previosuly generated audio file with the given audioId.
        ///// </summary>
        ///// <param name = "audioId" ></ param >
        ///// < returns ></ returns >
        //[HttpGet("download/{audioId}")]
        //public IActionResult DownloadAudio(string audioId)
        //{
        //    if (_audioCache.TryGetValue(audioId, out var audioBytes))
        //    {
        //        return File(audioBytes, "audio/wav", $"{audioId}.wav");
        //    }

        //    return NotFound("Audio not found.");
        //}
    }
}
