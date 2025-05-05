// contexts/AudioContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect, useRef, useCallback } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'

type AudioContextType = {

    // core playback
    play: (audioId: string, url: string) => void
    pause: () => void
    stop: () => void
    currentAudioId: string | null
    isPlaying: boolean

    // Time Management
    currentTime: number
    duration: number
}

const AudioContext = createContext<AudioContextType | null>(null)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const audio = useAudioPlayer()
    const [currentAudioId, setCurrentAudioId] = useState<string | null>(null) // Changed to state
    const [isChangingTrack, setIsChangingTrack] = useState(false)

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const frameRef = useRef<number | undefined>(undefined)

    // Time updates
    const updateTime = useCallback(() => {
        setCurrentTime(audio.getPosition())
        setDuration(audio.duration)

        if (audio.isPlaying) { // Changed to isPlaying
            frameRef.current = requestAnimationFrame(updateTime)
        }
    }, [audio.isPlaying, audio.getPosition, audio.duration])

    useEffect(() => {
        if (audio.isPlaying) {
            frameRef.current = requestAnimationFrame(updateTime)
        }
        return () => {
            if (frameRef.current !== undefined) {
                cancelAnimationFrame(frameRef.current)
            }
        }
    }, [audio.isPlaying, updateTime])

    // Updated play method with useCallback
    const play = useCallback((audioId: string, url: string) => {
        if (currentAudioId === audioId) {
            audio.togglePlayPause();
        } else {
            setIsChangingTrack(true);
            audio.stop();

            setCurrentAudioId(null); // Immediate reset

            audio.load(url, {
                autoplay: true,
                onload: () => {
                    setDuration(audio.duration);
                    setCurrentAudioId(audioId);
                },
                onend: () => {
                    if (currentAudioId === audioId) setCurrentAudioId(null);
                },
                onstop: () => {
                    if (currentAudioId === audioId) setCurrentAudioId(null);
                }
            });

            setTimeout(() => {
                setCurrentAudioId(audioId);
                setIsChangingTrack(false);
            }, 0);
        }
    }, [currentAudioId, audio, setIsChangingTrack]);

    // Sync state when audio stops naturally or via external controls
    useEffect(() => {
        if (!audio.isPlaying && currentAudioId && !isChangingTrack) {
            setCurrentAudioId(null)
        }
    }, [audio.isPlaying])

    return (
        <AudioContext.Provider
            value={{
                play,
                pause: audio.pause,
                stop: audio.stop,
                currentAudioId,
                isPlaying: audio.isPlaying,
                currentTime: audio.getPosition(),
                duration: audio.duration
            }}
        >
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    const context = useContext(AudioContext)
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider')
    }
    return context
}