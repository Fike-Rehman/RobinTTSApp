
export const dataGridContainerStyles = {
    width: "100%",
    bgcolor: "grey",
    borderRadius: 4,
    p: 3,
    minHeight: 400,
};

// export const titleStyles = {
//     mb: 2, // Space below title
//     color: "#ff9800",
//     fontWeight: "bold",
// };
export const importButtonStyles = {
    bgcolor: "#ff9800",
    "&:hover": {
        bgcolor: "#fb8c00",
        transform: "scale(1.02)",
        boxShadow: 3
    },
    fontWeight: "bold",
    textTransform: "none",
    color: "#ffffff",
    transition: "all 0.2s ease-in-out",
    borderRadius: "8px",
    px: 3,
    py: 1,
    "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
        color: "#ffffff"
    }
};

export const dataGridStyles = {
    flexGrow: 1,
    minHeight: 400,
    width: "100%", // Makes sure it takes full width of the container
    boxShadow: 10, // Adds some elevation effect
    borderRadius: 4, // Rounds the corners
    p: 4, // Padding for better spacing
    background: "linear-gradient(135deg, #373636,  #2b2b2b)", // Gradient background
    color: "#ffb74d", // Font color
    border: "4px solid #ff9800", // Outer border
    boxSizing: "border-box",

    "& .MuiDataGrid-row:nth-of-type(odd)": {
        backgroundColor: "#1e1e1e", // Zebra striping
    },
    "& .MuiDataGrid-row:hover": {
        backgroundColor: "#252525", // Hover effect
    },
    "& .MuiDataGrid-columnHeaders": {
        color: "#119900 !important",
        fontSize: "16px",
        borderBottom: "2px solid #ff9800",
    },
    "& .MuiDataGrid-columnSeparator": {
        display: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: "bold",
    },
    "& .MuiDataGrid-columnHeader": {
        borderLeft: "2px solid #ff9800",
        borderTop: "2px solid #ff9800",
    },
    "& .MuiDataGrid-columnHeaders:last-child": {
        borderRight: "2px solid #ff9800",
    },

    "& .MuiDataGrid-cell": {
        borderLeft: "2px solid #ff9800",
    },

    // workaround for last column border
    " & .MuiDataGrid-cell:last-child::after": {
        content: '""',
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: "#ff9800",
    },

};

