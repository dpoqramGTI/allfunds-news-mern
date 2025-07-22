import { INewsRepository } from "@/news/domain/news.repository.interface";

export class DeleteNewsUseCase {
  constructor(private repo: INewsRepository) {}

  async execute(id: string) {
    return this.repo.delete(id);
  }
}
