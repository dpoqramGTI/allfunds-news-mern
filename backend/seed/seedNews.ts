import "dotenv/config";
import { connect } from "../src/config/db";
import { NewsModel } from "../src/news/infrastructure/news.model";

export async function seedNews() {
  try {
    await connect();

    const existingCount = await NewsModel.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ️ La base de datos ya contiene ${existingCount} noticias. Seeding omitido.`);
      return;
    }

    const countArg = process.argv.find(arg => arg.startsWith("--count="));
    const totalCount = countArg ? parseInt(countArg.split("=")[1]) : 50;

    console.log(`⏳ Insertando ${totalCount} noticias (incluye archivadas)...`);

    const newNewsCount = Math.max(totalCount - 2, 0);

    const newNews = Array.from({ length: newNewsCount }).map((_, i) => ({
      title: `Noticia de prueba #${i + 1}`,
      description: `Generada automáticamente (ID ${i + 1}).`,
      content: `Contenido de la noticia número ${i + 1}.`,
      author: `Autor ${i + 1}`,
      date: new Date(Date.now() - i * 1000 * 60 * 60),
      imageUrl: `https://picsum.photos/seed/news${i}/600/400`,
    }));

    const archivedNews = [
      {
        title: "Noticia archivada 1",
        description: "Ejemplo para testear archivadas.",
        content: "Esta noticia está archivada.",
        author: "System",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        archiveDate: new Date(),
        imageUrl: "https://picsum.photos/seed/archived1/600/400",
      },
      {
        title: "Noticia archivada 2",
        description: "Segunda noticia archivada.",
        content: "Sirve para probar la vista de archivadas.",
        author: "System",
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        archiveDate: new Date(),
        imageUrl: "https://picsum.photos/seed/archived2/600/400",
      },
    ];

    const allNews = [...newNews, ...archivedNews];
    await NewsModel.insertMany(allNews);

    console.log(`✔️ Se insertaron ${allNews.length} noticias (de las cuales ${archivedNews.length} archivadas).`);
  } catch (err) {
    console.error("❌ Error al hacer seeding:", err);
  }
}
