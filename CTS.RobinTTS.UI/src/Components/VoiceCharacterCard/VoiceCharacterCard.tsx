import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './VoiceCharacterCard.css';
import useAudioPlayer from "../AudioPlayer/useAudioPlayer.tsx";

type VoiceName = 'George' | 'Dorothy';

type VoiceCharacterCardProps = {
    imageUrl: string;
    name: VoiceName;
    gender: string;
    origin: string;
};

const VoiceCharacterCard: React.FC<VoiceCharacterCardProps> = ({
    imageUrl,
    name,
    gender,
    origin
}) => {

    const { isPlaying, play, stop } = useAudioPlayer();

    const handlePlaySampleButtonClick = (name: VoiceName) => {
        isPlaying ? stop() : play({
            George: '/audio/GeorgeSample.mp3',
            Dorothy: '/audio/DorothySample.mp3'
        }[name]);
    };

    return (
        <Card className="voice-card">
            <div className='voice-card-media-wrapper'>
                <CardMedia
                    className="voice-card-media"
                    component="img"
                    image={imageUrl}
                    alt={name}
                />
            </div>
            <CardContent>
                <Box className="voice-card-content">
                    <Typography variant="h6" mb={1}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {gender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {origin}
                    </Typography>
                </Box>
            </CardContent>

            <IconButton
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
                onClick={() => handlePlaySampleButtonClick(name)}
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
        </Card>
    );
};

export default VoiceCharacterCard;
