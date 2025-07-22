import "./register-aliases";
import { connect } from "@/config/db";
import { trySetupChangeStream } from "@/config/changeStream";
import { httpServer } from "@/config/socket";
import { NewsModel } from "@/news/infrastructure/news.model";
import { seedNews } from "../seed/seedNews";

const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/newsdb";

export async function startServer() {
  try {
    await connect(MONGO_URI);

    const count = await NewsModel.countDocuments();

    if (count === 0) {
      console.log("⚠ No hay noticias, ejecutando seed inicial...");
      await seedNews();
      console.log("✅ Seed completado con noticias iniciales.");
    }

    // Configurar Change Stream para emitir eventos en tiempo real
    await trySetupChangeStream();

    httpServer.listen(PORT, () =>
      console.log(`🚀 Servidor backend en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error al iniciar el servidor:", err);
    process.exit(1);
  }
}

startServer();
