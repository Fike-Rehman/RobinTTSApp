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
            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
                className="voice-card-media"
            />
            <CardContent>
                <Box className="voice-card-content">
                    <Typography variant="h6" mb={0.1}>
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

            <IconButton className="play-button">
                <PlayArrowIcon />
            </IconButton>
        </Card>
    );
};

export default VoiceCharacterCard;
