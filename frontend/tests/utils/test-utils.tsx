import React, { ReactNode } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NewsProvider } from "@/features/news/contexts/NewsProvider";

const theme = createTheme();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NewsProvider>{children}</NewsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: Providers, ...options });

const renderWithoutRouter = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>
        <NewsProvider>{children}</NewsProvider>
      </ThemeProvider>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { renderWithProviders as render, renderWithoutRouter };
