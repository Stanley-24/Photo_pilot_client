// src/theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Shared Colors
const basePalette = {
  primary: {
    main: "#3498DB",
    contrastText: "#fff",
  },
  error: {
    main: "#E74C3C",
    light: "#FDEDEC",
  },
  text: {
    primary: "#2C3E50",
    secondary: "#566573",
  },
};

// 💡 Light Theme
const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      ...basePalette,
      background: {
        default: "#F4F6F7",
        paper: "#EBF5FD",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "'Inter', sans-serif",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 6,
            fontWeight: 600,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#90e0ef",
              color: "#2C3E50",
              boxShadow: "0 0 0 3px rgba(144,224,239,0.3)",
            },
          },
          containedPrimary: {
            backgroundColor: "#3498DB",
            "&:hover": {
              backgroundColor: "#90e0ef",
              color: "#2C3E50",
            },
          },
          outlinedPrimary: {
            borderColor: "#3498DB",
            color: "#3498DB",
            "&:hover": {
              backgroundColor: "#90e0ef",
              borderColor: "#3498DB",
              color: "#2C3E50",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#2C3E50",
            "&:hover": {
              backgroundColor: "#90e0ef",
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "#D6EAF8",
              color: "#21618C",
              "& .MuiListItemIcon-root": {
                color: "#21618C",
              },
            },
            "&:hover": {
              backgroundColor: "#90e0ef",
              color: "#2C3E50",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#EBF5FD",
            borderRadius: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          },
        },
      },
    },
  })
);

// 🌙 Dark Theme
const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#3498DB",
        contrastText: "#fff",
      },
      background: {
        default: "#121212",
        paper: "#1E1E1E",
      },
      text: {
        primary: "#F4F6F7",
        secondary: "#B0BEC5",
      },
      error: {
        main: "#EF5350",
        light: "#FFEBEE",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "'Inter', sans-serif",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 6,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#3498DB",
              color: "#fff",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#F4F6F7",
            "&:hover": {
              backgroundColor: "#1F2A33",
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "#2E3B4E",
              color: "#90CAF9",
              "& .MuiListItemIcon-root": {
                color: "#90CAF9",
              },
            },
            "&:hover": {
              backgroundColor: "#2E3B4E",
              color: "#fff",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#1E1E1E",
            borderRadius: 10,
          },
        },
      },
    },
  })
);

export { lightTheme, darkTheme };
