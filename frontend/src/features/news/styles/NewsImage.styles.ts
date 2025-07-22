import { SxProps, Theme } from "@mui/material";

export const imageContainer: SxProps<Theme> = {
  flex: "0 0 40%",
  position: "relative",
  minHeight: { xs: 180, sm: "100%" },
  overflow: "hidden",
  backgroundColor: "#f0f0f0",
};

export const imageSkeleton: SxProps<Theme> = {
  width: "100%",
  height: "100%",
};

export const imageStyle: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
  transition: "opacity 0.4s ease-in-out",
};
