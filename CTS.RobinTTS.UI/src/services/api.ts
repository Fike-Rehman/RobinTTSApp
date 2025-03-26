import axios from "axios";

const API_BASE_URL = "https://localhost:7254/api";  // Make sure it matches your backend port

// Function to test API connection
export const getTestMessage = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/test`);
        return response.data;
    } catch (error) {
        console.error("Error fetching test message:", error);
        return null;
    }
};

// Function to generate audio and return the blob URL (without playing it)
export const generateAudio = async (script: string, voiceName: string) => {
    console.log("Generating audio...");
    try {
        const response = await axios.post(`${API_BASE_URL}/tts/generate`,
            { Script: script, VoiceName: voiceName },
            { responseType: "blob" } // Receive as binary blob
        );

        const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        return { audioBlob, audioUrl }; // This can be stored in the component state
    } catch (error) {
        console.error("Error generating audio:", error);
        return null;
    }
};

// Function to play audio from a given blob URL
// export const playAudio = (audioUrl: string) => {
//     if (!audioUrl) {
//         console.error("No audio URL available.");
//         return;
//     }

//     const audio = new Audio(audioUrl);
//     audio.play();
// };
