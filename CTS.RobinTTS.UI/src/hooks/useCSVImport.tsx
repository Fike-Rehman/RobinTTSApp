import { useState } from 'react';
import { RowData } from '../types';

const useCSVImport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (csvText: string): RowData[] => {
    const lines = csvText.split('\n').filter((line) => line.trim() !== '');

    return lines.slice(1).map((line, index) => {
      // Split while preserving commas in quoted values
      const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      // Get the last column value and clean it
      const script = columns[columns.length - 1]
        .replace(/^"|"$/g, '') // Remove surrounding quotes
        .trim();

      return {
        id: index + 1, // Sequential IDs starting at 1
        script: script,
        voice: 'Dorothy', // Default voice
        enablePlayback: false,
        audioUrl: null,
        audioBlob: null,
      };
    });
  };

  const handleFileUpload = async (file: File): Promise<RowData[]> => {
    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      return parseCSV(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import CSV');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { handleFileUpload, loading, error };
};

export default useCSVImport;
