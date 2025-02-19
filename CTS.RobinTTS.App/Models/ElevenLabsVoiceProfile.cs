namespace RobinTTSApp.Models
{
    public class ElevenLabsVoiceProfile
    {
        public string? VoiceId { get; set; }
        public string? Model { get; set; }
        public double Stability { get; set; }
        public double SimilarityBoost { get; set; }
        public double Style { get; set; }
        public bool UseSpeakerBoost { get; set; }
    }
}
