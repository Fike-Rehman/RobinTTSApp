// export type PlayAudioButtonState = "pending" | "generating" | "ready";

export interface RowData {
    id: number;
    script: string;
    voice: string;
    enablePlayback: boolean;
    audioUrl: string | null;
    audioBlob: Blob | null;
}