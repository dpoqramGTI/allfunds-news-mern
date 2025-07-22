import mongoose, { Schema, Document } from "mongoose";

export interface NewsDocument extends Document {
  title: string;
  description: string;
  content: string;
  author: string;
  date: Date;
  archiveDate?: Date | null;
  imageUrl: string;
}

const NewsSchema = new Schema<NewsDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  archiveDate: { type: Date, default: null },
  imageUrl: {
    type: String,
    required: false,
    default: () =>
      `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/400`,
  },
});

export const NewsModel = mongoose.model<NewsDocument>("News", NewsSchema);
