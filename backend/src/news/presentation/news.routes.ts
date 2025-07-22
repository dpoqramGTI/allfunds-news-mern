// src/news/presentation/news.routes.ts
import { Router } from "express";
import { newsController } from "@/news/presentation/news.controller";

const router = Router();

router.get("/new", (req, res) => newsController.getNewNews(req, res));
router.get("/archived", (req, res) => newsController.getArchivedNews(req, res));
router.patch("/:id/archive", (req, res) => newsController.archiveNews(req, res));
router.delete("/:id", (req, res) => newsController.deleteNews(req, res));
router.post("/", (req, res) => newsController.createMockNews(req, res));

export default router;
