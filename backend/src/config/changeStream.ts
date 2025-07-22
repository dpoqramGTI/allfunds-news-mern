import mongoose from "mongoose";
import { NewsModel } from "@/news/infrastructure/news.model";
import { io } from "@/config/socket";

/**
 * Inicializa un ChangeStream para detectar inserciones en `NewsModel`
 * y emitirlas por Socket.IO en tiempo real.
 * Reintenta si la réplica de MongoDB aún no está lista.
 */
export async function trySetupChangeStream(retries = 5, delay = 3000): Promise<void> {
  try {
    const admin = mongoose.connection.db.admin();
    const status = await admin.command({ replSetGetStatus: 1 }).catch(() => null);

    if (status?.ok) {
      const changeStream = NewsModel.watch([], { fullDocument: "updateLookup" });

      changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
          io.emit("new-news", change.fullDocument);
        }
      });
      console.log("✅ ChangeStream activo en MongoDB.");
    } else {
      if (retries > 0) {
        console.warn(`Replica set no listo. Reintentando en ${delay / 1000}s...`);
        setTimeout(() => trySetupChangeStream(retries - 1, delay), delay);
      } else {
        console.warn("⚠️ No se pudo activar ChangeStream. Continuando sin tiempo real.");
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`⚠️ Error al inicializar ChangeStream: ${message}`);
    if (retries > 0) {
      setTimeout(() => trySetupChangeStream(retries - 1, delay), delay);
    }
  }
}
