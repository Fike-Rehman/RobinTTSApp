import { useAudio } from '../../Contexts/AudioContext'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { ReactNode } from 'react';
import { IconButton } from '@mui/material';

interface AudioButtonProps {
    audioId: string
    audioUrl: string
    playIcon?: ReactNode
    pauseIcon?: ReactNode
}

const AudioButton: React.FC<AudioButtonProps> = ({
    audioId,
    audioUrl
}) => {
    const { play, currentAudioId, isPlaying } = useAudio()

    const isActive = currentAudioId === audioId
    const showPause = isActive && isPlaying

    return (
        <IconButton
            onClick={() => play(audioId, audioUrl)}
            aria-label={showPause ? "Pause" : "Play"}
            sx={{
                backgroundColor: '#ff9800',
                marginLeft: '5px',
                color: '#fff',
                width: 40,
                height: 40,
                '&:hover': {
                    backgroundColor: '#e68900',
                }
            }}
        >
            {showPause ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
    )
}

export default AudioButton