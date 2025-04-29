export type PlayAudioButtonState = "pending" | "generating" | "ready";

export interface RowData {
    id: number;
    script: string;
    voice: string;
    accept: boolean;
    status: PlayAudioButtonState;
    audioUrl: string | null;
    audioBlob: Blob | null;
}