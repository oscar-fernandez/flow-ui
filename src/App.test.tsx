import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("mock test", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });

  it("should render text", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
