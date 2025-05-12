import { Button, Tooltip, CircularProgress } from '@mui/material';
import { SystemUpdateAlt } from '@mui/icons-material';
import { importButtonStyles } from './CSVImportButtonStyles.ts';
import { useRef } from 'react';

interface CSVImportButtonProps {
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

const CSVImportButton = ({ onImport, loading }: CSVImportButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onImport}
      />
      <Tooltip title="Import CSV" arrow>
        <Button
          variant="contained"
          onClick={() => fileInputRef.current?.click()}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SystemUpdateAlt />
            )
          }
          sx={importButtonStyles}
          disabled={loading}
        >
          {loading ? 'Importing...' : 'Import'}
        </Button>
      </Tooltip>
    </>
  );
};

export default CSVImportButton;
