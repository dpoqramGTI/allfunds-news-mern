import { renderHook, waitFor, act } from "@testing-library/react";
import { io as mockIo } from "socket.io-client";
import * as api from "@/features/news/services/newsApi";
import { useNews } from "@/features/news/hooks/useNews";
import { News } from "@/features/news/types/news";

jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

jest.mock("@/features/news/services/newsApi");

describe("useNews Hook (unit)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("carga noticias iniciales desde la API", async () => {
    (api.getNewNews as jest.Mock).mockResolvedValue({
      data: [
        {
          _id: "1",
          title: "Noticia inicial",
          description: "",
          content: "",
          author: "",
          date: new Date().toISOString(),
          archiveDate: null,
        },
      ],
      total: 1,
    });

    const { result } = renderHook(() => useNews());

    await waitFor(() => {
      expect(result.current.newNews.items).toHaveLength(1);
      expect(result.current.newNews.items[0].title).toBe("Noticia inicial");
    });
  });

  it("recibe evento de socket y agrega noticia", async () => {
    (api.getNewNews as jest.Mock).mockResolvedValue({ data: [], total: 0 });

    let handler: ((news: News) => void) | undefined;

    (mockIo as jest.Mock).mockReturnValue({
      on: (event: string, cb: (news: News) => void) => {
        if (event === "new-news") handler = cb;
      },
      off: jest.fn(),
      disconnect: jest.fn(),
    });

    const { result } = renderHook(() => useNews());

    await waitFor(() => {
      expect(result.current.newNews.items).toHaveLength(0);
    });

    // Simulamos llegada de noticia en tiempo real
    await act(async () => {
      if (handler) {
        handler({
          _id: "2",
          title: "Real-time News",
          description: "",
          content: "",
          author: "",
          date: new Date().toISOString(),
          archiveDate: null,
          imageUrl: "http://example.com/image.jpg",
        });
      }
    });

    await waitFor(() => {
      expect(result.current.newNews.items).toHaveLength(1);
      expect(result.current.newNews.items[0].title).toBe("Real-time News");
    });
  });

  it("elimina noticia con onRemove", async () => {
    (api.getNewNews as jest.Mock).mockResolvedValue({
      data: [
        {
          _id: "1",
          title: "N",
          description: "",
          content: "",
          author: "",
          date: new Date().toISOString(),
          archiveDate: null,
        },
      ],
      total: 1,
    });

    (api.deleteNews as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useNews());

    await waitFor(() => {
      expect(result.current.newNews.items).toHaveLength(1);
    });

    await act(async () => {
      await result.current.onRemove("1");
    });

    await waitFor(() => {
      expect(result.current.newNews.items).toHaveLength(0);
    });
  });
});
