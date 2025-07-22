
import NewNewsPage from "@/features/news/pages/NewNewsPage";
import { screen, fireEvent, waitFor, render } from "../utils/test-utils";
import ArchivedNewsPage from "@/features/news/pages/ArchivedNewsPage";

describe("App Integration (Pages)", () => {
  it("carga y muestra noticias nuevas", async () => {
    render(<NewNewsPage />);
    const noticia = await screen.findByText(/Noticia 1/i); 
    expect(noticia).toBeInTheDocument();
  });

  it("archiva noticia correctamente", async () => {
    render(<NewNewsPage />);
    const btn = await screen.findByText(/Archivar/i);
    fireEvent.click(btn);
    await waitFor(() => {
      expect(screen.queryByText(/Noticia 1/i)).not.toBeInTheDocument();
    });
  });

  it("muestra sección de archivadas vacía", async () => {
    render(<ArchivedNewsPage />);
    const titulo = await screen.findByText(/Noticias Archivadas/i);
    expect(titulo).toBeInTheDocument();
  });
});
