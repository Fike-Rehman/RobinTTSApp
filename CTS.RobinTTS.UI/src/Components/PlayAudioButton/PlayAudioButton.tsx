import { Button, CircularProgress } from "@mui/material";
import { PlayAudioButtonState } from "../../types";



interface PlayAudioButtonProps {
    state: PlayAudioButtonState
    onClick: () => void;
}

const playAudioButton = ({ state, onClick }: PlayAudioButtonProps) => {
    if (state === "pending") {
        return (
            <Button variant="contained" disabled>
                Pending
            </Button>
        );
    }

    if (state === "generating") {
        return (
            <Button variant="contained" disabled>
                <CircularProgress size={20} /> Generating...
            </Button>
        );
    }

    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            Play Audio
        </Button>
    );
};

export default playAudioButton;