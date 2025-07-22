import { Request, Response } from "express";
import { newsRepository } from "@/news/infrastructure/news.repository";
import { ListNewsUseCase } from "@/news/application/listNews.usecase";
import { ListArchivedNewsUseCase } from "@/news/application/listArchivedNews.usecase";
import { ArchiveNewsUseCase } from "@/news/application/archiveNews.usecase";
import { DeleteNewsUseCase } from "@/news/application/deleteNews.usecase";
import { CreateMockNewsUseCase } from "@/news/application/createMockNews.usecase";

const listNews = new ListNewsUseCase(newsRepository);
const listArchived = new ListArchivedNewsUseCase(newsRepository);
const archiveNews = new ArchiveNewsUseCase(newsRepository);
const deleteNews = new DeleteNewsUseCase(newsRepository);
const createMockNews = new CreateMockNewsUseCase(newsRepository);

export class NewsController {
  async getNewNews(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { data, total } = await listNews.execute(page, limit);
      res.json({ data, total });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  async getArchivedNews(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { data, total } = await listArchived.execute(page, limit);
      res.json({ data, total });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  async archiveNews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await archiveNews.execute(id);
      if (!updated) {
        return res.status(404).json({ error: "Noticia no encontrada" });
      }
      res.json(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  async deleteNews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await deleteNews.execute(id);
      res.json({ success: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  async createMockNews(req: Request, res: Response) {
    try {
      const news = await createMockNews.execute();
      res.status(201).json(news);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }
}

export const newsController = new NewsController();
