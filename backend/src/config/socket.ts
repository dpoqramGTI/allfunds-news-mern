import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "@/app";

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: "*" },
});
