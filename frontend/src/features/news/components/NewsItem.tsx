import { News } from "@/features/news/types/news";
import NewsCard from "./NewsCard";
import NewsActions from "./NewsActions";

interface Props {
  item: News;
  onArchive?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function NewsItem({ item, onArchive, onRemove }: Props) {
  return (
    <NewsCard item={item}>
      <NewsActions id={item._id} onArchive={onArchive} onRemove={onRemove} />
    </NewsCard>
  );
}
