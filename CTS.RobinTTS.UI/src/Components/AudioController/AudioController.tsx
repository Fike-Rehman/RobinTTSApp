import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useAudioPlayer } from 'react-use-audio-player';
import { useAudioContext } from '../../Contexts/AudioContext';
import './AudioController.css';

interface AudioControllerProps {
  audioId: string;
  audioUrl: string;
  disabled: boolean;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioController: React.FC<AudioControllerProps> = ({
  audioId,
  audioUrl,
  disabled,
}) => {
  const { currentAudioId, setCurrentAudioId } = useAudioContext();
  const { load, pause, stop, isPlaying, getPosition, duration } =
    useAudioPlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  const isActive = currentAudioId === audioId;
  const showPause = isActive && isPlaying;

  // Update time only when playing this audio
  // Stable updateTime callback
  const updateTime = useCallback(() => {
    setCurrentTime(getPosition());
    if (isPlaying && isActive) {
      frameRef.current = requestAnimationFrame(updateTime);
    }
  }, [getPosition, isPlaying, isActive]);

  useEffect(() => {
    // Function to update playback time
    const tick = () => {
      setCurrentTime(getPosition());
      frameRef.current = requestAnimationFrame(tick);
    };

    if (isActive) {
      // Load and play this audio
      load(audioUrl, {
        format: 'mp3',
        autoplay: true,
        onload: () => {
          setCurrentTime(0);
          frameRef.current = requestAnimationFrame(tick);
        },
        onend: () => {
          setCurrentAudioId(null);
        },
      });
    } else {
      // Stop and reset if not active
      stop();
      setCurrentTime(0);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isActive, audioUrl]);

  const handleClick = () => {
    if (isActive) {
      pause();
      setCurrentAudioId(null);
    } else {
      setCurrentAudioId(audioId);
    }
  };

  const displayTime = formatTime(currentTime);
  const displayTotal = formatTime(duration);

  return (
    <Box className="audio-controller-container">
      <IconButton
        onClick={handleClick}
        disabled={disabled}
        aria-label={showPause ? 'Pause' : 'Play'}
        sx={{
          backgroundColor: disabled ? 'action.disabled' : '#ff9800',
          marginLeft: '5px',
          color: disabled ? 'text.disabled' : '#fff',
          width: 24,
          height: 24,
          '& .MuiSvgIcon-root': {
            fontSize: '1rem', // Matches 16px
          },
          '&:hover': {
            backgroundColor: disabled ? 'action.disabled' : '#e68900',
          },
        }}
      >
        {isActive && isPlaying ? (
          <PauseIcon fontSize="small" />
        ) : (
          <PlayArrowIcon fontSize="small" />
        )}
      </IconButton>
      <Typography
        className="time-display"
        variant="caption"
        sx={{
          fontSize: '0.75rem !important', // 12px equivalent
          lineHeight: 1.3,
        }}
      >
        {displayTime} / {displayTotal}
      </Typography>
    </Box>
  );
};

export default AudioController;
