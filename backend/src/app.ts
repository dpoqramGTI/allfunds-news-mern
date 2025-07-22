import express from "express";
import cors from "cors";
import newsRoutes from "@/news/presentation/news.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/news", newsRoutes);
