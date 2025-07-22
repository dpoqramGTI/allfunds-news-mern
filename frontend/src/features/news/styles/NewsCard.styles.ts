import { SxProps, Theme } from "@mui/material";

export const cardStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  height: { xs: "auto", sm: 200 },
  borderRadius: 3,
  overflow: "hidden",
  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  backgroundColor: "#fff",
};

export const imageBox = (url: string): SxProps<Theme> => ({
  flex: "0 0 40%",
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: { xs: 180, sm: "100%" },
});

export const contentBox: SxProps<Theme> = {
  flex: "1 1 auto",
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: "bold",
  lineHeight: 1.3,
  mb: 1,
  color: "#222",
};

export const descStyle: SxProps<Theme> = {
  mb: 1.5,
  lineHeight: 1.5,
  color: "#555",
};

export const metaText: SxProps<Theme> = {
  fontSize: 13,
  color: "#777",
  display: "block",
};

export const archivedText: SxProps<Theme> = {
  fontSize: 12,
  color: "#1976d2",
  display: "block",
  mt: 0.3,
  fontWeight: "bold",
};
