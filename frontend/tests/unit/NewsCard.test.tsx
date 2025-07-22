import { render, fireEvent } from "@testing-library/react";
import NewsCard from "@/features/news/components/NewsCard";
import NewsList from "@/features/news/components/NewsList";

const dummy = {
  _id: "1",
  title: "Noticia",
  description: "Desc",
  content: "Cont",
  author: "Autor",
  date: new Date().toISOString(),
  imageUrl: "url",
  archiveDate: null,
};

test("renderiza el contenido y ejecuta botones pasados como children", () => {
  const archive = jest.fn();
  const del = jest.fn();

  const { getByText } = render(
    <NewsCard item={dummy}>
      <button onClick={archive}>Archivar</button>
      <button onClick={del}>Eliminar</button>
    </NewsCard>
  );

  expect(getByText("Noticia")).toBeInTheDocument(); // Título renderizado

  fireEvent.click(getByText("Archivar"));
  fireEvent.click(getByText("Eliminar"));

  expect(archive).toHaveBeenCalledTimes(1);
  expect(del).toHaveBeenCalledTimes(1);
});

test("renderiza NewsList vacía", () => {
  render(<NewsList items={[]} />);
});
