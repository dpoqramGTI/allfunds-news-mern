export interface News {
  _id?: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: Date;
  archiveDate?: Date | null;
  imageUrl?: string;
}
