import { Request, Response } from "express";
import { newsRepository } from "@/news/infrastructure/news.repository";
import { newsController } from "@/news/presentation/news.controller";

jest.mock("@/news/infrastructure/news.repository");

const mockReq = (params = {}, query = {}, body = {}) =>
  ({ params, query, body } as unknown as Request);

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("NewsController", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe devolver noticias nuevas correctamente", async () => {
    (newsRepository.findNew as jest.Mock).mockResolvedValue({ data: [], total: 0 });
    const res = mockRes();

    await newsController.getNewNews(mockReq({}, { page: "1", limit: "5" }), res);

    expect(res.json).toHaveBeenCalledWith({ data: [], total: 0 });
  });

  it("debe manejar error en getNewNews", async () => {
    (newsRepository.findNew as jest.Mock).mockRejectedValue(new Error("DB down"));
    const res = mockRes();

    await newsController.getNewNews(mockReq({}, { page: "1" }), res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("debe devolver archivadas correctamente", async () => {
    (newsRepository.findArchived as jest.Mock).mockResolvedValue({ data: [], total: 0 });
    const res = mockRes();

    await newsController.getArchivedNews(mockReq({}, { page: "1" }), res);

    expect(res.json).toHaveBeenCalledWith({ data: [], total: 0 });
  });

  it("debe manejar error en getArchivedNews", async () => {
    (newsRepository.findArchived as jest.Mock).mockRejectedValue(new Error("DB down"));
    const res = mockRes();

    await newsController.getArchivedNews(mockReq({}, { page: "1" }), res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("debe archivar una noticia (caso feliz)", async () => {
    const mockNews = { _id: "123", archiveDate: new Date() };
    (newsRepository.archive as jest.Mock).mockResolvedValue(mockNews);
    const res = mockRes();

    await newsController.archiveNews(mockReq({ id: "123" }), res);

    expect(res.json).toHaveBeenCalledWith(mockNews);
  });

  it("debe responder 404 si archive() devuelve null", async () => {
    (newsRepository.archive as jest.Mock).mockResolvedValue(null);
    const res = mockRes();

    await newsController.archiveNews(mockReq({ id: "x" }), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // NUEVO: cubre el bloque catch de archiveNews
  it("debe manejar error en archiveNews", async () => {
    (newsRepository.archive as jest.Mock).mockRejectedValue(new Error("fallo interno"));
    const res = mockRes();

    await newsController.archiveNews(mockReq({ id: "err" }), res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "fallo interno" });
  });

  it("debe manejar error en deleteNews", async () => {
    (newsRepository.delete as jest.Mock).mockRejectedValue(new Error("DB fail"));
    const res = mockRes();

    await newsController.deleteNews(mockReq({ id: "x" }), res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("debe eliminar noticia (caso feliz)", async () => {
    (newsRepository.delete as jest.Mock).mockResolvedValue(true);
    const res = mockRes();

    await newsController.deleteNews(mockReq({ id: "x" }), res);

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it("debe crear una noticia aleatoria (createMockNews)", async () => {
    const mockNews = { _id: "999", title: "Noticia aleatoria" };
    (newsRepository.create as jest.Mock).mockResolvedValue(mockNews);
    const res = mockRes();

    await newsController.createMockNews(mockReq(), res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockNews);
  });

  // NUEVO: cubre el bloque catch de createMockNews
  it("debe manejar error en createMockNews", async () => {
    (newsRepository.create as jest.Mock).mockRejectedValue(new Error("no se pudo crear"));
    const res = mockRes();

    await newsController.createMockNews(mockReq(), res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "no se pudo crear" });
  });
});