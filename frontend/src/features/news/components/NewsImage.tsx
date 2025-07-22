import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import { imageContainer, imageSkeleton, imageStyle } from "@/features/news/styles/NewsImage.styles";

interface Props {
  src: string;
  alt: string;
}

export default function NewsImage({ src, alt }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <Box sx={imageContainer}>
      {loading && <Skeleton variant="rectangular" sx={imageSkeleton} animation="wave" />}
      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        sx={{ ...imageStyle, opacity: loading ? 0 : 1 }}
      />
    </Box>
  );
}
