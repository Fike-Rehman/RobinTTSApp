import { useEffect } from "react";
import { Action, useAudioGeneratorReducer } from './useAudioGeneratorReducer';
import { generateAudio } from "../../services/api";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { SyncRounded, PublishedWithChangesRounded } from "@mui/icons-material";

export interface AudioGeneratorProps {

    script: string;
    voiceName: string;
    resetKey: any;
    onStart?: () => void;
    onComplete: (audioUrl: string) => void;
}

const AudioGenerator: React.FC<AudioGeneratorProps> = ({ script, voiceName, resetKey, onStart, onComplete }) => {
    const { state, dispatch } = useAudioGeneratorReducer(resetKey);

    // Trigger backend call on START
    useEffect(() => {
        if (state === 'loading') {
            (async () => {
                try {
                    onStart?.();
                    const result = await generateAudio(script, voiceName);
                    if (!result) throw new Error('No audio returned from generateAudio');
                    const audioUrl = result.audioUrl;
                    dispatch({ type: 'SUCCESS', payload: { audioUrl } } as Action);
                    onComplete(audioUrl);
                } catch (err) {
                    console.error('Audio generation error:', err);
                    dispatch({ type: 'RESET' } as Action);
                }
            })();
        }
    }, [state, script, voiceName, onStart, onComplete, dispatch]);

    // Handler to start generation
    const handleStart = () => dispatch({ type: 'START' } as Action);

    // Render based on state
    let content: React.ReactNode;
    if (state === 'idle') {
        content = (
            <Tooltip title="Generate Audio">
                <span><IconButton onClick={handleStart} aria-label="Generate Audio" size="small">
                    <SyncRounded color="primary" sx={{ fontSize: 24 }} />
                </IconButton></span>

            </Tooltip>
        );
    } else if (state === 'loading') {
        content = <CircularProgress size={24} />;
    } else { // ready
        content = (
            <Tooltip title="Audio Ready">
                <span>
                    <IconButton disabled aria-label="Audio Ready" size="small">
                        <PublishedWithChangesRounded color="success" sx={{ fontSize: 24 }} />
                    </IconButton>
                </span>
            </Tooltip>
        );
    }

    return <>{content}</>;

}

export default AudioGenerator