import mongoose from "mongoose";

let isConnected = false;

export async function connect(uri?: string): Promise<typeof mongoose> {
  // Usa URI por defecto si no se pasa ninguna
  const MONGO_URI = uri || process.env.MONGO_URI || "mongodb://localhost:27017/newsdb";

  if (isConnected) return mongoose; // Evita reconexiones

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "newsdb",
    });
    isConnected = true;
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
    process.exit(1);
  }

  return mongoose;
}
