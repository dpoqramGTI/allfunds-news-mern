import { Card, Box, Typography, Stack } from "@mui/material";
import { News } from "@/features/news/types/news";
import {
  cardStyles,
  contentBox,
  titleStyle,
  descStyle,
  metaText,
  archivedText,
} from "@/features/news/styles/NewsCard.styles";
import NewsImage from "@/features/news/components/NewsImage";

interface Props {
  item: News;
  children?: React.ReactNode;
}

export default function NewsCard({ item, children }: Props) {
  const imageUrl = item.imageUrl || "https://picsum.photos/600/400?random";
  const createdDate = new Date(item.date).toLocaleDateString("es-ES");
  const archivedDate = item.archiveDate
    ? new Date(item.archiveDate).toLocaleDateString("es-ES")
    : null;

  return (
    <Card data-testid={`news-item-${item._id}`} sx={cardStyles}>
      <NewsImage src={imageUrl} alt={item.title} />

      <Box sx={contentBox}>
        <Box>
          <Typography variant="h6" sx={titleStyle}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={descStyle}>
            {item.description}
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              data-testid={`news-meta-${item._id}`}
              variant="caption"
              sx={metaText}
            >
              Creada: {createdDate} • {item.author}
            </Typography>
            {archivedDate && (
              <Typography variant="caption" sx={archivedText}>
                Archivada: {archivedDate}
              </Typography>
            )}
          </Box>
          {children}
        </Stack>
      </Box>
    </Card>
  );
}
