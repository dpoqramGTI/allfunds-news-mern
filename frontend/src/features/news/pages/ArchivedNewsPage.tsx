// src/pages/ArchivedNewsPage.tsx
import { Box, Typography, Divider, Container } from "@mui/material";
import NewsList from "@/features/news/components/NewsList";
import { useNewsContext } from "@/features/news/contexts/NewsProvider";
import { Pagination } from "@/components/Pagination";


export default function ArchivedNewsPage() {
  const { archivedNews, onRemove, loadArchivedNews } = useNewsContext();
  const { items, page, total } = archivedNews;
  const totalPages = Math.ceil(total / 10);

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Noticias Archivadas
        </Typography>
        <Divider sx={{ width: 120, borderBottomWidth: 3, borderColor: "primary.main" }} />
      </Box>

      <NewsList items={items} onRemove={onRemove} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          current={page}
          total={totalPages}
          onChange={(p) => loadArchivedNews(p)}
        />
      </Box>
    </Container>
  );
}
