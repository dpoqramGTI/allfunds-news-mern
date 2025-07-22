import React from "react";
import * as ReactDOM from "react-dom/client";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

import "@/main";

test("main.tsx monta la app sin fallar", () => {
  expect(ReactDOM.createRoot).toHaveBeenCalled();
});
