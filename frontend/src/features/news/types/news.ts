export interface News {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  archiveDate?: string | null;
  imageUrl: string;
}
