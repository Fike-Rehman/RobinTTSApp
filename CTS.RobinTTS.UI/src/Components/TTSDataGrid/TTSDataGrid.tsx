import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, Checkbox, MenuItem, Select, Tooltip } from "@mui/material";
import { dataGridContainerStyles, dataGridStyles } from "./TTSDataGridStyles";
import PlayAudioButton from "../PlayAudioButton/PlayAudioButton";
import { RowData } from "../../types";
import { generateAudio } from "../../services/api";
import { playAudio } from "../../services/utils";
import CSVImportButton from "../CSVImportButton/CSVImportButton";
import useCSVImport from "../../hooks/useCSVImport";
import { AudioController } from "../AudioController/AudioController";

const voices = ["Dorothy", "George"];

const TTSDataGrid = () => {

    const [rows, setRows] = useState<RowData[]>([]);
    const { handleFileUpload, loading, error } = useCSVImport();

    const handleCheckboxChange = async (id: number) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, accept: true, status: "generating" } : row
            )
        );

        const row = rows.find((row) => row.id === id);
        if (!row) return;

        const result = await generateAudio(row.script, row.voice);
        if (result) {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id
                        ? {
                            ...row,
                            status: "ready",
                            audioUrl: result.audioUrl,  // Store in row
                            audioBlob: result.audioBlob // Store in row
                        }
                        : row
                )
            );
        } else {
            // Failure: Roll back to "pending"
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id
                        ? {
                            ...row,
                            status: "pending", // Roll back
                            audioUrl: null,    // Clear
                            audioBlob: null,   // Clear
                        }
                        : row
                )
            );
            console.error(`Audio generation failed for row ${id}.`);
        }
    };

    const handleVoiceChange = (id: number, newVoice: string) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, voice: newVoice } : row))
        );
    };

    const handlePlayAudio = (id: number) => {
        const row = rows.find((row) => row.id === id);
        if (row && row.audioUrl !== null) {  // Explicit null check
            playAudio(row.audioUrl);
        } else {
            console.error("Audio not yet generated for row:", id);
        }
    };

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

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            width: 50,
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
            width: 150,
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
            field: "accept",
            headerName: "Accept",
            width: 80,
            renderCell: (params) => (
                <Checkbox onChange={() => handleCheckboxChange(params.row.id)} />
            )
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => (
                // <PlayAudioButton
                //     state={params.row.status}
                //     onClick={() => handlePlayAudio(params.row.id)}
                // />
                <AudioController audioId="1" audioUrl={params.row.audioUrl} disabled={false}></AudioController>

            )
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
                <AudioController audioId="1" audioUrl="/audio/GeorgeSample.mp3" disabled={false}></AudioController>
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