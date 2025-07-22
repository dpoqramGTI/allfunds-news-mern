import { render, screen } from "@testing-library/react";
import ArchivedNewsPage from "@/features/news/pages/ArchivedNewsPage";

jest.mock("@/features/news/contexts/NewsProvider", () => ({
  useNewsContext: () => ({
    archivedNews: { data: [], total: 0 },
    onRemove: jest.fn(),
    loadArchivedNews: jest.fn(),
  }),
}));

describe("ArchivedNewsPage", () => {
  it("renderiza correctamente", () => {
    render(<ArchivedNewsPage />);
    expect(screen.getByText(/Noticias Archivadas/i)).toBeInTheDocument();
  });
});
