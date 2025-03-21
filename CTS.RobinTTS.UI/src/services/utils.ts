// Function to play an audio file from a given URL
export const playAudio = (audioUrl: string) => {
    if (!audioUrl) {
        console.error("No audio URL available.");
        return;
    }

    const audio = new Audio(audioUrl);
    audio.play().catch((error) => console.error("Error playing audio:", error));
};

// Function to download an audio file from a given Blob
export const downloadAudio = (audioBlob: Blob, fileName: string = "audio.mp3") => {
    if (!audioBlob) {
        console.error("No audio available to download.");
        return;
    }

    const blobUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
};
