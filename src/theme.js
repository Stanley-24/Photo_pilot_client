// src/theme.js
import { createTheme } from "@mui/material/styles";

// Optional: add a Google Font in your index.html or via CSS
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Tailwind blue-600
    },
    background: {
      default: "#fefefe",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      letterSpacing: "-1px",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.7,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        },
      },
    },
  },
});

export default theme;
