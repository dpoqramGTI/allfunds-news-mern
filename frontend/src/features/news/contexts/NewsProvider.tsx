import React, { createContext, useContext, ReactNode } from "react";
import { PaginatedState, useNews } from "@/features/news/hooks/useNews";

interface NewsContextProps {
  newNews: PaginatedState;
  archivedNews: PaginatedState;
  lastSocketNewsId: string | null;
  loadNewNews: (page?: number) => Promise<void>;
  loadArchivedNews: (page?: number) => Promise<void>;
  onArchive: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

const NewsContext = createContext<NewsContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const NewsProvider = ({ children }: ProviderProps) => {
  const news = useNews();
  return <NewsContext.Provider value={news}>{children}</NewsContext.Provider>;
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNewsContext debe usarse dentro de un NewsProvider");
  return context;
};
