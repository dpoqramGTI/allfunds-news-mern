import { INewsRepository } from "@/news/domain/news.repository.interface";
import { NewsModel } from "@/news/infrastructure/news.model";
import { News } from "../domain/news.entity";

export class NewsRepository implements INewsRepository {
  async findNew(page: number, limit: number) {
    const data = await NewsModel.find({ archiveDate: null })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const total = await NewsModel.countDocuments({ archiveDate: null });
    return { data, total };
  }

  async findArchived(page: number, limit: number) {
    const data = await NewsModel.find({ archiveDate: { $ne: null } })
      .sort({ archiveDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const total = await NewsModel.countDocuments({ archiveDate: { $ne: null } });
    return { data, total };
  }

  async save(news: News) {
    const created = new NewsModel(news);
    return created.save();
  }

  async archive(id: string) {
    return NewsModel.findByIdAndUpdate(id, { archiveDate: new Date() }, { new: true });
  }

  async delete(id: string) {
    await NewsModel.findByIdAndDelete(id);
  }
  
  async create(news: News) {
    const created = new NewsModel(news);
    return created.save();
  }
}

export const newsRepository = new NewsRepository();
