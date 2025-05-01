// contexts/AudioContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'

type AudioContextType = {
    play: (audioId: string, url: string) => void
    pause: () => void
    stop: () => void
    currentAudioId: string | null
    isPlaying: boolean
}

const AudioContext = createContext<AudioContextType | null>(null)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const audioPlayer = useAudioPlayer()

    const [currentAudioId, setCurrentAudioId] = useState<string | null>(null) // Changed to state

    const play = (audioId: string, url: string) => {
        if (currentAudioId === audioId) {
            // Toggle play/pause for same audio
            audioPlayer.togglePlayPause()
        } else {
            // Stop previous audio and load new
            audioPlayer.stop()
            audioPlayer.load(url, {
                autoplay: true,
                onend: () => {
                    // Only reset if still the current audio
                    if (currentAudioId === audioId) setCurrentAudioId(null)
                },
                onstop: () => {
                    // Only reset if still the current audio
                    if (currentAudioId === audioId) setCurrentAudioId(null)
                }
            })
            setCurrentAudioId(audioId)
        }
    }

    // Sync state when audio stops naturally or via external controls
    useEffect(() => {
        if (!audioPlayer.isPlaying && currentAudioId) {
            setCurrentAudioId(null)
        }
    }, [audioPlayer.isPlaying])

    return (
        <AudioContext.Provider
            value={{
                play,
                pause: audioPlayer.pause,
                stop: audioPlayer.stop,
                currentAudioId,
                isPlaying: audioPlayer.isPlaying
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