// import { useState, useRef, useEffect } from 'react';

// const useAudioPlayer = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     // Initialize audio element
//     useEffect(() => {
//         audioRef.current = new Audio();

//         return () => {
//             // Cleanup
//             audioRef.current?.pause();
//             audioRef.current = null;
//         };
//     }, []);

//     const play = (audioUrl: string) => {
//         if (!audioRef.current) return;

//         // Stop current playback if changing sources
//         if (audioRef.current.src !== audioUrl) {
//             audioRef.current.pause();
//             audioRef.current.src = audioUrl;
//         }

//         audioRef.current.play()
//             .then(() => setIsPlaying(true))
//             .catch(error => console.error("Playback failed:", error));
//     };

//     const stop = () => {
//         if (!audioRef.current) return;
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         setIsPlaying(false);
//     };

//     // Set up event listeners
//     useEffect(() => {
//         const audio = audioRef.current;
//         if (!audio) return;

//         const handleEnded = () => setIsPlaying(false);
//         const handlePause = () => setIsPlaying(false);
//         const handlePlay = () => setIsPlaying(true);

//         audio.addEventListener('ended', handleEnded);
//         audio.addEventListener('pause', handlePause);
//         audio.addEventListener('play', handlePlay);

//         return () => {
//             audio.removeEventListener('ended', handleEnded);
//             audio.removeEventListener('pause', handlePause);
//             audio.removeEventListener('play', handlePlay);
//         };
//     }, []);

//     return { isPlaying, play, stop };
// };

// export default useAudioPlayer;