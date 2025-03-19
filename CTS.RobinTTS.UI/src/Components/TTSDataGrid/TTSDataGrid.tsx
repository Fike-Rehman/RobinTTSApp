import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, Checkbox, MenuItem, Select, Typography } from "@mui/material";
import { dataGridContainerStyles, dataGridStyles, titleStyles } from "./TTSDataGridStyles";


const voices = ["Dorothy", "George"];

const initialRows = [
    { id: 1, script: "Hello world", voice: "Dorothy", accept: false, progress: "", download: "" },
    { id: 2, script: "How are you", voice: "George", accept: false, progress: "", download: "" },
];

const TTSDataGrid = () => {

    const [rows, setRows] = useState(initialRows);

    const handleCheckboxChange = (id: number) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, progress: "Generating..." } : row
            )
        );
        setTimeout(() => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, progress: "done" } : row
                )
            );
        }, 2000); // Simulate API call delay
    };

    const handleVoiceChange = (id: number, newVoice: string) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, voice: newVoice } : row))
        );
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
            field: "progress",
            headerName: "Progress",
            width: 100
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