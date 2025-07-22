import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import NewNewsPage from "@/features/news/pages/NewNewsPage";
import ArchivedNewsPage from "@/features/news/pages/ArchivedNewsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<NewNewsPage />} />
          <Route path="/archived" element={<ArchivedNewsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
