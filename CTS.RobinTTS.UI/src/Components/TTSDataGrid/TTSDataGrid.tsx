import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, MenuItem, Select, Tooltip } from "@mui/material";
import { dataGridContainerStyles, dataGridStyles } from "./TTSDataGridStyles";
import { RowData } from "../../types";
import CSVImportButton from "../CSVImportButton/CSVImportButton";
import useCSVImport from "../../hooks/useCSVImport";
import AudioController from "../AudioController/AudioController";
import AudioGenerator from "../AudioGenerator/AudioGenerator";

const voices = ["Dorothy", "George"];

const TTSDataGrid = () => {

    const [rows, setRows] = useState<RowData[]>([]);
    const { handleFileUpload, loading, error } = useCSVImport();

    const handleVoiceChange = (id: number, newVoice: string) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, voice: newVoice } : row))
        );
    };

    // const handlePlayAudio = (id: number) => {
    //     const row = rows.find((row) => row.id === id);
    //     if (row && row.audioUrl !== null) {
    //         playAudio(row.audioUrl);
    //     } else {
    //         console.error("Audio not yet generated for row:", id);
    //     }
    // };

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const newRows = await handleFileUpload(file);
            setRows(newRows); // Completely replace existing rows
        } catch (err) {
            console.error('Import failed:', error);
        }
    };

    const handleComplete = (id: number, audioUrl: string) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id
                    ? { ...row, enablePlayback: true, audioUrl: audioUrl }
                    : row
            )
        );
    };

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            width: 40,
            editable: false
        },
        {
            field: "script",
            headerName: "Script",
            flex: 1,
            editable: true
        },
        {
            field: "voice",
            headerName: "Voice Name",
            width: 120,
            renderCell: (params) => (
                <Select
                    value={params.row.voice}
                    onChange={(e) => handleVoiceChange(params.row.id, e.target.value)}
                    fullWidth
                >
                    {voices.map((voice) => (
                        <MenuItem key={voice} value={voice}>
                            {voice}
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            field: "approve",
            headerName: "Approve",
            width: 90,
            renderCell: (params) => (
                <AudioGenerator
                    script={params.row.script}
                    voiceName={"Dorothy"}
                    resetKey={params.row.script}       // resets if script cell is edited
                    onStart={() => console.log('Row', params.row.id, 'started')}
                    onComplete={(url) => handleComplete(params.row.id, url)}
                />
            )
        },
        {
            field: "audio",
            headerName: "Audio",
            width: 150,
            renderCell: (params) => {

                return (
                    <AudioController audioId={params.row.id.toString()} audioUrl={params.row.audioUrl} disabled={!params.row.enablePlayback}></AudioController>
                )
            },
        },
    ];
    return (
        <Box sx={dataGridContainerStyles}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
                gap: 1
            }}>
                {/* <AudioGenerator script={"Hello, this is another test script for audio generation."} voiceName={"Dorothy"} resetKey={1} onComplete={handleComplete}></AudioGenerator> */}
                <AudioController audioId="1100" audioUrl="/audio/GeorgeSample.mp3" disabled={false}></AudioController>
                <Tooltip title="Import CSV" arrow>
                    <CSVImportButton onImport={handleFileInputChange}
                        loading={loading} />
                </Tooltip>
            </Box>
            <DataGrid rows={rows} columns={columns} sx={dataGridStyles} />
        </Box>
    );
};

export default TTSDataGrid;