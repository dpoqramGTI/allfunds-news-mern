import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { cleanup } from "@testing-library/react";
import { TextEncoder, TextDecoder } from "util";  // <-- IMPORTA DE util
import { News } from "../src/features/news/types/news";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

const mockNews: News[] = [
  {
    _id: "1",
    title: "Noticia 1",
    description: "Descripción",
    content: "Contenido",
    author: "Autor",
    date: new Date().toISOString(),
    archiveDate: null,
    imageUrl: "https://picsum.photos/seed/test/600/400",
  },
];

export const server = setupServer(
  rest.get("http://localhost:9000/api/news/new", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockNews, total: mockNews.length }));
  }),

  rest.get("http://localhost:9000/api/news/archived", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockNews, total: mockNews.length }));
  }),

  rest.patch("http://localhost:9000/api/news/:id/archive", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = mockNews.findIndex(n => n._id === id);
    if (index !== -1) {
      mockNews.splice(index, 1);
    }
    return res(ctx.status(200));
  }),

  rest.get("http://localhost:9000/socket.io/", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
