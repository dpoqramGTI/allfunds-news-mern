import { render, renderWithoutRouter, screen } from "../utils/test-utils";
import App from "@/App";
import Header from "@/layouts/Header";
import Layout from "@/layouts/Layout";
import ThemeProvider from "@/layouts/themes/ThemeProvider";

test("monta App", () => {
  renderWithoutRouter(<App />);
  expect(screen.getByText(/Nuevas/i)).toBeInTheDocument();
});

test("monta Header y Layout", () => {
  render(<Header />);
  expect(screen.getByAltText(/Allfunds/i)).toBeInTheDocument();

  render(
    <Layout>
      <div>contenido</div>
    </Layout>
  );
  expect(screen.getByText(/contenido/i)).toBeInTheDocument();
});

test("monta ThemeProvider", () => {
  render(
    <ThemeProvider>
      <div>content</div>
    </ThemeProvider>
  );
  expect(screen.getByText(/content/i)).toBeInTheDocument();
});
