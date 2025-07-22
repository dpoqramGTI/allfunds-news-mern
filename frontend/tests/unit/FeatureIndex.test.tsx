import * as NewsModule from "@/features/news";

test("el módulo de news exporta lo esperado", () => {
  expect(NewsModule).toHaveProperty("useNews");
  expect(NewsModule).toHaveProperty("useNewsContext");
  expect(NewsModule).toHaveProperty("NewsProvider");
  expect(NewsModule).toHaveProperty("getNewNews");
  expect(NewsModule).toHaveProperty("archiveNews");
  expect(NewsModule).toHaveProperty("deleteNews");
});
