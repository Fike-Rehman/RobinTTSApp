import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { Box, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import {
  dataGridContainerStyles,
  dataGridStyles,
  voiceImageStyle,
  voiceSelectStyles,
} from './TTSDataGridStyles';
import { RowData } from '../../types';
import CSVImportButton from '../CSVImportButton/CSVImportButton';
import useCSVImport from '../../hooks/useCSVImport';
import AudioController from '../AudioController/AudioController';
import AudioGenerator from '../AudioGenerator/AudioGenerator';

const voices = ['Dorothy', 'George'];

const TTSDataGrid = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const { handleFileUpload, loading, error } = useCSVImport();

  const handleVoiceChange = (id: number, newVoice: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, voice: newVoice } : row,
      ),
    );
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
          : row,
      ),
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 40,
      editable: false,
    },
    {
      field: 'script',
      headerName: 'Script',
      flex: 1,
      editable: true,
    },
    {
      field: 'voice',
      headerName: 'Voice Name',
      width: 120,
      renderCell: (params) => (
        <Select
          value={params.row.voice}
          onChange={(e) => handleVoiceChange(params.row.id, e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={voiceSelectStyles}
          renderValue={(selected) =>
            selected ? (
              <Tooltip title={selected}>
                <Box
                  component="img"
                  src={`/Avatars/${selected}.png`}
                  alt={selected}
                  sx={voiceImageStyle}
                />
              </Tooltip>
            ) : (
              <Typography variant="body2" sx={{ color: '#888' }}>
                Select Voice
              </Typography>
            )
          }
        >
          {voices.map((voice) => (
            <MenuItem key={voice} value={voice}>
              <Box display="flex" alignItems="top">
                <img
                  src={`/Avatars/${voice}.png`}
                  alt={voice}
                  style={{ objectFit: 'cover' }}
                  width={36}
                  height={36}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {voice}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: 'generate',
      headerName: 'Generate',
      width: 90,
      renderCell: (params) => (
        <AudioGenerator
          script={params.row.script}
          voiceName={'Dorothy'}
          resetKey={params.row.script}
          onStart={() => console.log('Row', params.row.id, 'started')}
          onComplete={(url) => handleComplete(params.row.id, url)}
        />
      ),
      cellClassName: 'controls-column',
    },
    {
      field: 'audio',
      headerName: 'Audio',
      width: 150,
      renderCell: (params) => {
        return (
          <AudioController
            audioId={params.row.id.toString()}
            audioUrl={params.row.audioUrl}
            disabled={!params.row.enablePlayback}
          ></AudioController>
        );
      },
      cellClassName: 'controls-column',
    },
  ];
  return (
    <Box sx={dataGridContainerStyles}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
          gap: 1,
        }}
      >
        <Tooltip title="Import CSV" arrow>
          <CSVImportButton onImport={handleFileInputChange} loading={loading} />
        </Tooltip>
      </Box>
      <DataGrid rows={rows} columns={columns} sx={dataGridStyles} />
    </Box>
  );
};

export default TTSDataGrid;
