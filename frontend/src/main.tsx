import ReactDOM from "react-dom/client";
import App from "@/App";
import { NewsProvider } from "@/features/news/contexts/NewsProvider";
import AppTheme from "@/layouts/themes/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppTheme>
    <NewsProvider>
      <App />
    </NewsProvider>
  </AppTheme>
);
