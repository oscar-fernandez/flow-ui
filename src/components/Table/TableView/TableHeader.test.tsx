import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import TableHeader from "./TableHeader";

const headers = ["A", "B", "C"];

describe("TableHeader Unit tests", () => {
  it("should render", () => {
    render(<TableHeader headers={headers} />);
    expect(screen.getByTestId("table-header")).toBeInTheDocument();
  });

  it("should render list of header items", () => {
    render(<TableHeader headers={headers} />);
    expect(screen.getByTestId("A").textContent).toBe("A");
  });
});
