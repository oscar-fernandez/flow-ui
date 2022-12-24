import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import TableRow from "./TableRow";

const rows = ["A", "B", "C"];

describe("TableRow Unit tests", () => {
  it("should render", () => {
    render(<TableRow rows={rows} />);
    expect(screen.getByTestId("table-row")).toBeInTheDocument();
  });

  it("should render list of row items", () => {
    render(<TableRow rows={rows} />);
    expect(screen.getByTestId("A").textContent).toBe("A");
  });
});
