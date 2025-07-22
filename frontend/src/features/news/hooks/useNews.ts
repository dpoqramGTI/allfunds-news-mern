import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getNewNews, getArchivedNews, archiveNews, deleteNews } from "@/features/news/services/newsApi";
import { News } from "@/features/news/types/news";

export interface PaginatedState {
  items: News[];
  page: number;
  total: number;
}

export function useNews() {
  const [newNews, setNewNews] = useState<PaginatedState>({ items: [], page: 1, total: 0 });
  const [archivedNews, setArchivedNews] = useState<PaginatedState>({ items: [], page: 1, total: 0 });
  const [lastSocketNewsId, setLastSocketNewsId] = useState<string | null>(null);
  const socketRef = useRef<Socket>();

  const normalizeResponse = (res: any): PaginatedState => ({
    items: res.items ?? res.data ?? [],
    page: res.page ?? 1,
    total: res.total ?? 0,
  });

  const loadNewNews = async (page = 1) => {
    const res = await getNewNews(page);
    setNewNews(normalizeResponse({ ...res, page }));
  };

  const loadArchivedNews = async (page = 1) => {
    const res = await getArchivedNews(page);
    setArchivedNews(normalizeResponse({ ...res, page }));
  };

  useEffect(() => {
    loadNewNews(1);
    loadArchivedNews(1);
    
    // Conectamos vía WebSocket para recibir noticias en tiempo real
    const socket = io("http://localhost:9000", { transports: ["websocket"], upgrade: false });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Conectado vía WebSocket:", socket.id);
    });

    socket.on("new-news", (news: News) => {
      console.log("Nueva noticia recibida:", news);
      setLastSocketNewsId(news._id || Date.now().toString());
      setNewNews((prev) => {
        if (prev.page === 1) {
          return { ...prev, items: [news, ...prev.items].slice(0, 10), total: prev.total + 1 };
        }
        return { ...prev, total: prev.total + 1 };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onArchive = async (id: string) => {
    try {
      await archiveNews(id);
      setNewNews((prev) => ({ ...prev, items: prev.items.filter((n) => n._id !== id) }));
      loadArchivedNews(archivedNews.page);
    } catch (err) {
      console.error("Error archivando noticia:", err);
    }
  };

  const onRemove = async (id: string) => {
    try {
      await deleteNews(id);
      setNewNews((prev) => ({
        ...prev,
        items: prev.items.filter((n) => n._id !== id),
        total: prev.total - 1,
      }));
      setArchivedNews((prev) => ({
        ...prev,
        items: prev.items.filter((n) => n._id !== id),
        total: prev.total - 1,
      }));
    } catch (err) {
      console.error("Error eliminando noticia:", err);
    }
  };

  return { newNews, archivedNews, lastSocketNewsId, loadNewNews, loadArchivedNews, onArchive, onRemove };
}
