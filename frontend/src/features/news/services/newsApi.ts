import axios from "axios";
import { News } from "@/features/news/types/news";

const API_URL = "http://localhost:9000/api/news";

/**
 * Obtiene las noticias nuevas (paginadas).
 */
export async function getNewNews(page = 1): Promise<{ items: News[]; total: number; page: number }> {
  const res = await axios.get(`${API_URL}/new`, { params: { page } });
  return {
    items: res.data.items ?? res.data.data ?? [],
    total: res.data.total ?? 0,
    page: res.data.page ?? page,
  };
}

/**
 * Obtiene las noticias archivadas (paginadas).
 */
export async function getArchivedNews(page = 1): Promise<{ items: News[]; total: number; page: number }> {
  const res = await axios.get(`${API_URL}/archived`, { params: { page } });
  return {
    items: res.data.items ?? res.data.data ?? [],
    total: res.data.total ?? 0,
    page: res.data.page ?? page,
  };
}

/**
 * Archiva una noticia.
 */
export async function archiveNews(id: string): Promise<void> {
  await axios.patch(`${API_URL}/${id}/archive`);
}

/**
 * Elimina una noticia.
 */
export async function deleteNews(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

/**
 * Crea una noticia de prueba (útil para seeds manuales o tests).
 * Genera automáticamente una imagen aleatoria si no se pasa.
 */
export async function createNews(data: Partial<News>): Promise<News> {
  const newsData: Partial<News> = {
    title: data.title ?? "Noticia sin título",
    description: data.description ?? "Descripción por defecto",
    content: data.content ?? "Contenido de prueba",
    author: data.author ?? "System",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    imageUrl: data.imageUrl ?? `https://picsum.photos/seed/${Date.now()}/600/400`,
  };

  const res = await axios.post(API_URL, newsData);
  return res.data;
}
