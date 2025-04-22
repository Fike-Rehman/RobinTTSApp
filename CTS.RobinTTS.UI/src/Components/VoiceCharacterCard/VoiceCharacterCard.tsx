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
import './VoiceCharacterCard.css';

type VoiceCharacterCardProps = {
    imageUrl: string;
    name: string;
    gender: string;
    origin: string;
};

const VoiceCharacterCard: React.FC<VoiceCharacterCardProps> = ({
    imageUrl,
    name,
    gender,
    origin
}) => {
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
            >
                <PlayArrowIcon />
            </IconButton>
        </Card>
    );
};

export default VoiceCharacterCard;
