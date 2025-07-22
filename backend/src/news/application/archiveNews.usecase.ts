import { INewsRepository } from "@/news/domain/news.repository.interface";

export class ArchiveNewsUseCase {
  constructor(private repo: INewsRepository) {}

  async execute(id: string) {
    return this.repo.archive(id);
  }
}
