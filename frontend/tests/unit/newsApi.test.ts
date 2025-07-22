import axios from "axios";
import {
  getNewNews,
  getArchivedNews,
  archiveNews,
  deleteNews,
  createNews,
} from "@/features/news/services/newsApi";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("newsApi extra coverage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("getNewNews devuelve items y total correctamente", async () => {
    mockedAxios.get.mockResolvedValue({ data: { items: [1], total: 5, page: 1 } });
    const res = await getNewNews(1);
    expect(res.items).toEqual([1]);
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it("getArchivedNews devuelve items y total correctamente", async () => {
    mockedAxios.get.mockResolvedValue({ data: { data: [2], total: 3, page: 2 } });
    const res = await getArchivedNews(2);
    expect(res.items).toEqual([2]);
    expect(res.page).toBe(2);
  });

  it("archiveNews llama axios.patch", async () => {
    mockedAxios.patch.mockResolvedValue({});
    await archiveNews("123");
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      "http://localhost:9000/api/news/123/archive"
    );
  });

  it("deleteNews llama axios.delete", async () => {
    mockedAxios.delete.mockResolvedValue({});
    await deleteNews("321");
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "http://localhost:9000/api/news/321"
    );
  });

  it("createNews rellena valores por defecto", async () => {
    mockedAxios.post.mockResolvedValue({ data: { _id: "newid" } });

    const result = await createNews({});
    expect(result).toEqual({ _id: "newid" });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:9000/api/news",
      expect.objectContaining({
        title: "Noticia sin título",
        description: "Descripción por defecto",
        content: "Contenido de prueba",
        author: "System",
        imageUrl: expect.stringContaining("https://picsum.photos/seed/"),
      })
    );
  });
});
