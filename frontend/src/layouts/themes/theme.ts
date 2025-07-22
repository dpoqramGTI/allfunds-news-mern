import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary:   { main: "#1976d2" },
    secondary: { main: "#ff6b01" },
    background:{ default:"#f4f6f8" }
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: { fontWeight: 600 },
    body1: { color: "#333" }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 4px 16px rgba(0,0,0,0.08)", transition: "0.3s" }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500 }
      }
    }
  }
});
