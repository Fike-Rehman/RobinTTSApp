import React, { useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useAudioPlayer } from 'react-use-audio-player';
import { useAudioContext } from '../../Contexts/AudioContext';

interface PlayAudioButtonProps {
  audioId: string;
  audioUrl: string;
}

const PlayAudioButton: React.FC<PlayAudioButtonProps> = ({
  audioId,
  audioUrl,
}) => {
  const { currentAudioId, setCurrentAudioId } = useAudioContext();
  const { load, pause, stop, isPlaying } = useAudioPlayer();

  const isActive = currentAudioId === audioId;

  // Load or stop audio when active state changes
  useEffect(() => {
    if (isActive) {
      load(audioUrl, { format: 'mp3', autoplay: true });
    } else {
      stop();
    }
  }, [isActive, audioUrl]);

  const handleClick = () => {
    if (isActive && isPlaying) {
      pause();
      setCurrentAudioId(null);
    } else {
      setCurrentAudioId(audioId);
    }
  };

  return (
    <Tooltip title={isActive && isPlaying ? 'Pause Audio' : 'Play Audio'}>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          backgroundColor: '#ff9800',
          marginLeft: '5px',
          color: '#fff',
          width: 40,
          height: 40,
          '&:hover': {
            backgroundColor: '#e68900',
          },
        }}
      >
        {isActive && isPlaying ? (
          <PauseIcon fontSize="small" />
        ) : (
          <PlayArrowIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default PlayAudioButton;
