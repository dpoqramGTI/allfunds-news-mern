import { setupServer } from "msw/node";
import { rest } from "msw";

const news = [
  { _id: "1", title: "Noticia 1", description: "D1", content: "C1", author: "A1", date: new Date().toISOString(), archiveDate: null },
  { _id: "2", title: "Noticia 2", description: "D2", content: "C2", author: "A2", date: new Date().toISOString(), archiveDate: null }
];

export const server = setupServer(
  rest.get("http://localhost:9000/api/news/new", (req, res, ctx) => {
    return res(ctx.json({ data: news, total: 2 }));
  }),
  rest.get("http://localhost:9000/api/news/archived", (req, res, ctx) => {
    return res(ctx.json({ data: [], total: 0 }));
  }),
  rest.patch("http://localhost:9000/api/news/:id/archive", (req, res, ctx) => {
    return res(ctx.json({ ...news[0], archiveDate: new Date().toISOString() }));
  }),
  rest.delete("http://localhost:9000/api/news/:id", (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);
