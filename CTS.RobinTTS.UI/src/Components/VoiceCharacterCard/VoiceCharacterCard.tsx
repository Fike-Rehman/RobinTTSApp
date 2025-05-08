
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import './VoiceCharacterCard.css';
// import AudioButton from '../AudioButton/AudioButton';

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

    const audioUrl = name === 'George' ? '/audio/GeorgeSample.mp3' : '/audio/DorothySample.mp3';

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

            {/* <AudioButton
                audioId={`voice-${name}`}
                audioUrl={audioUrl}
            /> */}
        </Card>
    );
};

export default VoiceCharacterCard;
