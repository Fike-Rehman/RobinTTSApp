// contexts/AudioContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react'

type AudioContextType = {
    currentAudioId: string | null;
    setCurrentAudioId: (audioId: string | null) => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);

    return (
        <AudioContext.Provider value={{ currentAudioId, setCurrentAudioId }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudioContext = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudioContext must be used within AudioProvider');
    return context;
};
