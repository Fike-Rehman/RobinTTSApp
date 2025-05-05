import { useAudio } from '../../Contexts/AudioContext'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { IconButton, Typography, Box } from '@mui/material'
import './AudioController.css'

interface AudioControllerProps {
    audioId: string
    audioUrl: string
    disabled?: boolean
}

const formatTime = (seconds: number) => {
    if (!seconds) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)
    return `${minutes}:${remaining.toString().padStart(2, '0')}`
}

export const AudioController = ({
    audioId,
    audioUrl,
    disabled = false
}: AudioControllerProps) => {
    const { play, pause, isPlaying, currentAudioId, currentTime, duration } = useAudio()
    const isActive = currentAudioId === audioId

    const showPause = isActive && isPlaying

    return (
        <Box className="audio-controller-container ${disabled ? 'disabled' : ''}">
            <IconButton
                disabled={disabled}
                onClick={() => showPause ? pause() : play(audioId, audioUrl)}
                aria-label={showPause ? "Pause" : "Play"}
                sx={{
                    backgroundColor: disabled ? 'action.disabled' : '#ff9800',
                    marginLeft: '5px',
                    color: disabled ? 'text.disabled' : '#fff',
                    width: 24,
                    height: 24,
                    '& .MuiSvgIcon-root': {
                        fontSize: '1rem'  // Matches 16px
                    },
                    '&:hover': {
                        backgroundColor: disabled ? 'action.disabled' : '#e68900',
                    }
                }}
            >
                {showPause ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <Typography className={`time-display ${disabled ? 'disabled' : ''}`}
                variant='body2'
                sx={{
                    fontSize: '0.75rem !important',  // 12px equivalent
                    lineHeight: 1.2
                }}>

                {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
        </Box>
    )
}
