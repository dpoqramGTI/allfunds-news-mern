import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import NewsItem from "@/features/news/components/NewsItem";
import { News } from "@/features/news/types/news";

interface Props {
  items: News[];
  onArchive?: (id: string) => void;
  onRemove?: (id: string) => void;
  lastSocketNewsId?: string | null;
}

export default function NewsList({ items = [], onArchive, onRemove, lastSocketNewsId }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        alignItems: "center",
      }}
    >
      {lastSocketNewsId && <div data-testid="socket-news-ready" data-id={lastSocketNewsId} />}
      <AnimatePresence>
        {items.map((n, index) => (
          <motion.div
            key={n._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            style={{ width: "100%" }}
          >
            <NewsItem
              item={n}
              onArchive={onArchive}
              onRemove={onRemove}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
