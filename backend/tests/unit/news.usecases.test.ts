import { ListNewsUseCase } from "@/news/application/listNews.usecase";
import { ListArchivedNewsUseCase } from "@/news/application/listArchivedNews.usecase";
import { ArchiveNewsUseCase } from "@/news/application/archiveNews.usecase";
import { DeleteNewsUseCase } from "@/news/application/deleteNews.usecase";
import { CreateMockNewsUseCase } from "@/news/application/createMockNews.usecase";
import { INewsRepository } from "@/news/domain/news.repository.interface";
import { News } from "@/news/domain/news.entity";

describe("Casos de uso de Noticias", () => {
  let mockRepo: jest.Mocked<INewsRepository>;
  const baseNews: News = {
    _id: "1",
    title: "Noticia de prueba",
    description: "Descripción de prueba",
    content: "Contenido de prueba",
    author: "Autor de prueba",
    date: new Date(),
    imageUrl: "https://picsum.photos/600/400",
  };

  beforeEach(() => {
    mockRepo = {
      findNew: jest.fn(),
      findArchived: jest.fn(),
      archive: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    } as any;
  });

  test("ListNewsUseCase devuelve noticias nuevas", async () => {
    mockRepo.findNew.mockResolvedValue({ data: [baseNews], total: 1 });

    const usecase = new ListNewsUseCase(mockRepo);
    const result = await usecase.execute(1, 10);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toBe("Noticia de prueba");
    expect(mockRepo.findNew).toHaveBeenCalledWith(1, 10);
  });

  test("ListArchivedNewsUseCase devuelve noticias archivadas", async () => {
    const archivedNews = { ...baseNews, _id: "2", title: "Archivada" };
    mockRepo.findArchived.mockResolvedValue({ data: [archivedNews], total: 1 });

    const usecase = new ListArchivedNewsUseCase(mockRepo);
    const result = await usecase.execute(1, 10);

    expect(result.data[0].title).toBe("Archivada");
    expect(mockRepo.findArchived).toHaveBeenCalledWith(1, 10);
  });

  test("ArchiveNewsUseCase archiva una noticia existente", async () => {
    mockRepo.archive.mockResolvedValue(baseNews);

    const usecase = new ArchiveNewsUseCase(mockRepo);
    const result = await usecase.execute("1");

    expect(result).toEqual(baseNews);
    expect(mockRepo.archive).toHaveBeenCalledWith("1");
  });

  test("DeleteNewsUseCase elimina una noticia por id", async () => {
    mockRepo.delete.mockResolvedValue();

    const usecase = new DeleteNewsUseCase(mockRepo);
    await usecase.execute("1");

    expect(mockRepo.delete).toHaveBeenCalledWith("1");
  });

  test("CreateMockNewsUseCase genera y crea una noticia aleatoria", async () => {
    const createdNews: News = {
      ...baseNews,
      _id: "99",
      title: "Noticia aleatoria #1234",
    };
    mockRepo.create.mockResolvedValue(createdNews);

    const usecase = new CreateMockNewsUseCase(mockRepo);
    const result = await usecase.execute();

    expect(result).toEqual(createdNews);
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
    expect(mockRepo.create.mock.calls[0][0]).toHaveProperty("title");
  });
});
