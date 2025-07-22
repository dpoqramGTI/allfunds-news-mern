import { INewsRepository } from "@/news/domain/news.repository.interface";

export class CreateMockNewsUseCase {
  constructor(private repo: INewsRepository) {}

  async execute() {
    const randomId = Math.floor(Math.random() * 10000);

    return this.repo.create({
      title: `Noticia aleatoria #${randomId}`,
      description: `Descripción generada para la noticia ${randomId}`,
      content: `Contenido simulado de la noticia número ${randomId}.`,
      author: `Autor ${randomId}`,
      date: new Date(),
      imageUrl: `https://picsum.photos/seed/random${randomId}/600/400`,
    });
  }
}
