import { INewsRepository } from "@/news/domain/news.repository.interface";

export class ListNewsUseCase {
  constructor(private repo: INewsRepository) {}

  async execute(page: number, limit: number) {
    return this.repo.findNew(page, limit);
  }
}
