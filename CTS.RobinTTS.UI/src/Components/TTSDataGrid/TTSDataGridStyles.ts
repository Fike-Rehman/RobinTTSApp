export const dataGridContainerStyles = {
  width: '100%',
  bgcolor: '#1e1e1e',
  // borderRadius: 4,
  p: 3,
  minHeight: 400,
};

export const dataGridStyles = {
  flexGrow: 1,
  minHeight: 400,
  width: '100%', // Makes sure it takes full width of the container
  boxShadow: 10, // Adds some elevation effect
  borderRadius: 4, // Rounds the corners
  p: 4, // Padding for better spacing
  background: 'linear-gradient(135deg, #373636,  #2b2b2b)', // Gradient background
  color: '#ffb74d', // Font color
  border: '4px solid #ff9800', // Outer border
  boxSizing: 'border-box',

  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#1e1e1e', // Zebra striping
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#252525', // Hover effect
  },
  '& .MuiDataGrid-columnHeaders': {
    color: '#119900 !important',
    fontSize: '16px',
    borderBottom: '2px solid #ff9800',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-columnHeader': {
    borderLeft: '2px solid #ff9800',
    borderTop: '2px solid #ff9800',
  },
  '& .MuiDataGrid-columnHeaders:last-child': {
    borderRight: '2px solid #ff9800',
  },

  '& .MuiDataGrid-cell': {
    borderLeft: '2px solid #ff9800',
  },

  // workaround for last column border
  ' & .MuiDataGrid-cell:last-child::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: '#ff9800',
  },

  '& .controls-column': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  '& .voice-thumbnail': {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ff9800',
  },
};
