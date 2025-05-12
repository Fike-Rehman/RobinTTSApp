// Function to play an audio file from a given URL
export const playAudio = (audioSource: string) => {
  if (!audioSource) {
    console.error('No audio Source available.');
    return;
  }

  const audioUrl = audioSource.startsWith('/audio/')
    ? `${window.location.origin}${audioSource}`
    : audioSource;

  const audio = new Audio(audioUrl);
  audio.play().catch((error) => console.error('Error playing audio:', error));
};

// Function to download an audio file from a given Blob
export const downloadAudio = (
  audioBlob: Blob,
  fileName: string = 'audio.wav',
) => {
  if (!audioBlob) {
    console.error('No audio available to download.');
    return;
  }

  const blobUrl = URL.createObjectURL(audioBlob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};
