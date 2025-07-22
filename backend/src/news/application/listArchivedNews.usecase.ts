import { INewsRepository } from "@/news/domain/news.repository.interface";

export class ListArchivedNewsUseCase {
  constructor(private repo: INewsRepository) {}

  async execute(page: number, limit: number) {
    return this.repo.findArchived(page, limit);
  }
}
