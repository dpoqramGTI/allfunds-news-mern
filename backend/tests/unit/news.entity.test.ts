import { News } from "@/news/domain/news.entity";

describe("News Entity", () => {
  it("debe crear una noticia con todos los campos obligatorios", () => {
    const news: News = {
      _id: "123",
      title: "Título",
      description: "Desc",
      content: "Contenido",
      author: "Autor",
      date: new Date(),
      archiveDate: null
    };
    expect(news.title).toBe("Título");
    expect(news.archiveDate).toBeNull();
  });

  it("debe permitir asignar archiveDate después", () => {
    const news: News = {
      _id: "123",
      title: "Otra",
      description: "Desc",
      content: "Contenido",
      author: "Autor",
      date: new Date(),
      archiveDate: null
    };
    const now = new Date();
    news.archiveDate = now;
    expect(news.archiveDate).toBeInstanceOf(Date);
  });
});
