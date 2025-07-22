import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "@/app";
import { NewsModel } from "@/news/infrastructure/news.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "test-newsdb" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await NewsModel.deleteMany({});
});

describe("News API (Integration)", () => {
  it("flujo completo: crear, listar, archivar, eliminar", async () => {
    // Crear 12 noticias a través del endpoint (POST)
    for (let i = 0; i < 12; i++) {
      const createRes = await request(app).post("/api/news").send({
        title: `Noticia ${i}`,
        description: "Desc",
        content: "Contenido",
        author: "Autor",
        date: new Date(),
        imageUrl: `https://example.com/image${i}.jpg`
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body._id).toBeDefined();
    }

    // Listar página 1 (10 noticias)
    const listRes = await request(app).get("/api/news/new?page=1&limit=10");
    expect(listRes.status).toBe(200);
    expect(listRes.body.data).toHaveLength(10);
    expect(listRes.body.total).toBe(12);

    // Archivar la primera noticia
    const idToArchive = listRes.body.data[0]._id;
    const archiveRes = await request(app).patch(`/api/news/${idToArchive}/archive`);
    expect(archiveRes.status).toBe(200);
    expect(archiveRes.body.archiveDate).toBeTruthy();

    // Verificar que hay 1 archivada
    const archivedRes = await request(app).get("/api/news/archived?page=1&limit=10");
    expect(archivedRes.status).toBe(200);
    expect(archivedRes.body.total).toBe(1);
    expect(archivedRes.body.data[0]._id).toBe(idToArchive);

    // Eliminar la archivada
    const deleteRes = await request(app).delete(`/api/news/${idToArchive}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);

    // Comprobar que ya no existe
    const finalArchived = await request(app).get("/api/news/archived?page=1&limit=10");
    expect(finalArchived.status).toBe(200);
    expect(finalArchived.body.total).toBe(0);
  });
});
