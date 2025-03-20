import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, Checkbox, MenuItem, Select, Typography } from "@mui/material";
import { dataGridContainerStyles, dataGridStyles, titleStyles } from "./TTSDataGridStyles";
import PlayAudioButton from "../PlayAudioButton/PlayAudioButton";
import { PlayAudioButtonState } from "../../types";




const voices = ["Dorothy", "George"];

export interface RowData {
    id: number;
    script: string;
    voice: string;
    accept: boolean;
    status: PlayAudioButtonState;
    download: string;
}

const initialRows: RowData[] = [
    {
        id: 1,
        script: "Hello world",
        voice: "Dorothy",
        accept: false,
        status: "pending",
        download: "",
    },
    {
        id: 2,
        script: "Here I am ",
        voice: "George",
        accept: false,
        status: "pending",
        download: "",
    }
    // ... other rows
];

const TTSDataGrid = () => {

    const [rows, setRows] = useState(initialRows);

    const handleCheckboxChange = (id: number) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, accept: true, status: "generating" } : row
            )
        );
        setTimeout(() => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, status: "ready" } : row
                )
            );
        }, 5000); // Simulate API call delay
    };

    const handleVoiceChange = (id: number, newVoice: string) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, voice: newVoice } : row))
        );
    };

    const handlePlayAudio = (id: number) => {
        const row = rows.find((row) => row.id === id);
        if (row) {
            console.log("Playing audio for row:", row.id);
            // Add logic to play the audio here
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
                <PlayAudioButton
                    state={params.row.status}
                    onClick={() => handlePlayAudio(params.row.id)}
                />

            )
        },
        {
            field: "download",
            headerName: "Download",
            width: 100
        }
    ];

    return (
        <Box sx={dataGridContainerStyles}>
            <Typography variant="h6" sx={titleStyles}>
                My Data Table
            </Typography>
            <DataGrid rows={rows} columns={columns} sx={dataGridStyles} />
        </Box>
    );
};

export default TTSDataGrid;