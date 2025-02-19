using Microsoft.Extensions.Options;
using RobinTTSApp.Models;
using System.Text;
using System.Text.Json;

namespace RobinTTSApp.Services
{
    public class ElevenLabsService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ElevenLabsService> _logger;
        private readonly Dictionary<string, ElevenLabsVoiceProfile> _voiceProfileLookup;
        private readonly string _apiKey;

        private static readonly string apiBaseUrl = "https://api.elevenlabs.io/v1/text-to-speech/";

        public ElevenLabsService(HttpClient httpClient,
                                 ILogger<ElevenLabsService> logger,
                                 IConfiguration configuration,
                                 IOptions<Dictionary<string, ElevenLabsVoiceProfile>> voiceProfile,
                                 IOptions<AppSecrets> secrets)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            _apiKey = secrets.Value.ElevenLabsApiKey ?? throw new ArgumentNullException(nameof(secrets.Value.ElevenLabsApiKey), 
                                                                                            "Couldn't find ElevenLabs API Key configuration");

            _voiceProfileLookup = voiceProfile.Value ?? throw new ArgumentNullException(nameof(voiceProfile.Value),
                                                                                        "Couldn't find Voice Profile configuration");
        }

        public async Task<byte[]?> GenerateAudioAsync(string script, string voiceName)
        {
            if (string.IsNullOrWhiteSpace(_apiKey))
            {
                _logger.LogError("ElevenLabs API key is invalid or null.");
                return null;
            }

            if (!_voiceProfileLookup.ContainsKey(voiceName))
            {
                _logger.LogError($"Voice Profile not found for: {voiceName}");
                return null;
            }

            var vProfile = _voiceProfileLookup[voiceName];

            var requestBody = new
            {
                text = script,
                model_id = vProfile.Model,
                voice_settings = new
                {
                    stability = vProfile.Stability ,  // Controls voice stability (0.0 - 1.0)
                    similarity_boost = vProfile.SimilarityBoost,  // Controls how close the output matches the original voice (0.0 - 1.0)
                    style = vProfile.Style,  // Controls expressiveness (if applicable for the voice)
                    use_speaker_boost = vProfile.UseSpeakerBoost  // Enhances voice clarity and presence
                }
            };

            string json = JsonSerializer.Serialize(requestBody);
            var jsonContent = new StringContent(json, Encoding.UTF8, "application/json");

            var baseUri = new Uri(apiBaseUrl);
            var apiUri = new Uri(baseUri, vProfile.VoiceId);

            // **DO NOT SET HEADERS GLOBALLY!** Instead, set them per request.
            using var requestMessage = new HttpRequestMessage(HttpMethod.Post, apiUri);
            requestMessage.Headers.Add("xi-api-key", _apiKey);
            requestMessage.Content = jsonContent;

            var response = await _httpClient.SendAsync(requestMessage);

            if (!response.IsSuccessStatusCode)
            {
                var errorMsg = await response.Content.ReadAsStringAsync();
                throw new Exception($"Eleven Labs API Error: {errorMsg}");
            }

            return await response.Content.ReadAsByteArrayAsync();
        }
    }
}
