import NewsList from "@/features/news/components/NewsList";
import { News } from "@/features/news/types/news";
import { render, screen, fireEvent } from "@testing-library/react";

describe("NewsList", () => {
  const mockNews: News[] = [
    {
      _id: "1",
      title: "Noticia 1",
      description: "D1",
      content: "C1",
      author: "A1",
      date: new Date().toISOString(),
      archiveDate: null,
      imageUrl: "https://example.com/image1.jpg",
    },
  ];

  it("muestra noticias y ejecuta onArchive", () => {
    const onArchive = jest.fn();
    render(<NewsList items={mockNews} onArchive={onArchive} />);
    fireEvent.click(screen.getByText(/Archivar/i));
    expect(onArchive).toHaveBeenCalledWith("1");
  });

  it("muestra noticias y ejecuta onRemove con confirmación", () => {
    const onRemove = jest.fn();
    render(<NewsList items={mockNews} onRemove={onRemove} />);

    fireEvent.click(screen.getByText(/Eliminar/i));

    fireEvent.click(screen.getByRole("button", { name: /Eliminar/i }));

    expect(onRemove).toHaveBeenCalledWith("1");
  });
});
