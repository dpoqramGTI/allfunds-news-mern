import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { NewsModel } from "@/news/infrastructure/news.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("NewsModel", () => {
  beforeEach(async () => {
    await NewsModel.deleteMany({});
  });

  it("debería crear una noticia con valores por defecto", async () => {
    const news = await NewsModel.create({
      title: "Título test",
      description: "Descripción test",
      content: "Contenido test",
      author: "Autor test"
    });

    expect(news.date).toBeInstanceOf(Date);
    expect(news.archiveDate).toBeNull();
    expect(news.imageUrl).toMatch(/^https:\/\/picsum\.photos\/seed\/\d+\/600\/400$/);
  });

  it("debería lanzar error si faltan campos obligatorios", async () => {
    const news = new NewsModel({});
    let error: any;
    try {
      await news.validate();
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.errors.title).toBeDefined();
    expect(error.errors.description).toBeDefined();
    expect(error.errors.content).toBeDefined();
    expect(error.errors.author).toBeDefined();
  });

  it("debería guardar y recuperar una noticia correctamente", async () => {
    const created = await NewsModel.create({
      title: "Noticia persistente",
      description: "Desc",
      content: "Contenido",
      author: "Autor persistente",
      imageUrl: "https://example.com/image.jpg"
    });

    const found = await NewsModel.findById(created._id);
    expect(found).not.toBeNull();
    expect(found?.title).toBe("Noticia persistente");
    expect(found?.imageUrl).toBe("https://example.com/image.jpg");
  });
});
