import { News } from "@/news/domain/news.entity";

export interface INewsRepository {
  findNew(page: number, limit: number): Promise<{ data: News[]; total: number }>;
  findArchived(page: number, limit: number): Promise<{ data: News[]; total: number }>;
  save(news: News): Promise<News>;
  archive(id: string): Promise<News | null>;
  delete(id: string): Promise<void>;
  create(news: News): Promise<News>;
}
