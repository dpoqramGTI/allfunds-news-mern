import { Box, Typography, Divider, Container, Button } from "@mui/material";
import NewsList from "@/features/news/components/NewsList";
import { useNewsContext } from "@/features/news/contexts/NewsProvider";
import { Pagination } from "@/components/Pagination";


export default function NewNewsPage() {
  const { newNews, lastSocketNewsId, onArchive, loadNewNews } = useNewsContext();
  const { items, page, total } = newNews;
  const totalPages = Math.ceil(total / 10);

  const addMockNews = async () => {
    console.log("Añadiendo noticia mock...");
    await fetch("http://localhost:9000/api/news", { method: "POST" });
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Noticias
          </Typography>
          <Divider sx={{ width: 80, borderBottomWidth: 3, borderColor: "primary.main" }} />
        </Box>
        <Button variant="contained" color="primary" onClick={addMockNews}>
          Añadir noticia (mock)
        </Button>
      </Box>

      <NewsList items={items} onArchive={onArchive} lastSocketNewsId={lastSocketNewsId} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          current={page}
          total={totalPages}
          onChange={(p) => loadNewNews(p)}
        />
      </Box>
    </Container>
  );
}
