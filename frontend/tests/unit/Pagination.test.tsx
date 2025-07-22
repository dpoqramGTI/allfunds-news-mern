import { render, screen, fireEvent } from "../utils/test-utils";
import { Pagination } from "@/components/Pagination";

describe("Pagination component", () => {
  test("renderiza y llama a onChange al cambiar de página", () => {
    const handleChange = jest.fn();
    render(<Pagination current={1} total={5} onChange={handleChange} />);

    const page2Button = screen.getByRole("button", { name: /Go to page 2/i });
    fireEvent.click(page2Button);

    expect(handleChange).toHaveBeenCalledWith(2);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("muestra el número total de páginas correctamente", () => {
    render(<Pagination current={3} total={5} onChange={() => {}} />);
    const lastPageButton = screen.getByRole("button", { name: /Go to page 5/i });
    expect(lastPageButton).toBeInTheDocument();
  });
});
