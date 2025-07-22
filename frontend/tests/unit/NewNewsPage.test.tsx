import { render, screen, fireEvent } from "@testing-library/react";
import NewNewsPage from "@/features/news/pages/NewNewsPage";

const loadMock = jest.fn();

beforeEach(() => {
  jest.resetModules();
});

jest.mock("@/features/news/contexts/NewsProvider", () => ({
  useNewsContext: () => ({
    newNews: {
      items: [
        {
          _id: "1",
          title: "Noticia 1",
          description: "D1",
          content: "C1",
          author: "A1",
          date: new Date(),
          archiveDate: null,
        },
      ],
      total: 20,
      page: 1,
    },
    onArchive: jest.fn(),
    loadNewNews: loadMock,
  }),
}));

jest.mock("@/features/news/components/NewsList", () => ({
  __esModule: true,
  default: ({ items }: { items?: any[] }) => (
    <div>
      {(items ?? []).map((i) => (
        <div key={i._id}>{i.title}</div>
      ))}
    </div>
  ),
}));

describe("NewNewsPage", () => {
  it("renderiza correctamente", () => {
    render(<NewNewsPage />);
    expect(screen.getByText(/Noticias/i)).toBeInTheDocument();
    expect(screen.getByText(/Noticia 1/i)).toBeInTheDocument();
  });

  it("llama a fetch al pulsar el botón de Añadir noticia (mock)", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;

    render(<NewNewsPage />);
    const button = screen.getByRole("button", { name: /Añadir noticia/i });
    fireEvent.click(button);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/news",
      { method: "POST" }
    );
  });

  it("llama a loadNewNews al cambiar página", () => {
    render(<NewNewsPage />);
    const page2Button = screen.getByRole("button", { name: /Go to page 2/i });
    fireEvent.click(page2Button);
    expect(loadMock).toHaveBeenCalledWith(2);
  });
});
