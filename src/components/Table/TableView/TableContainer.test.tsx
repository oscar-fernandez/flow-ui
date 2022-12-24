import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableContainer from "./TableContainer";
const headers = ["Project Name", "Tech Stack"];
const rows = ["A", "B", "C"];

describe("TableView tests", () => {
  it("should render", () => {
    render(<TableContainer headers={headers} rows={rows} />);
    expect(screen.getByTestId("table-container")).toBeInTheDocument();
  });
  it("should render headers", () => {
    render(<TableContainer headers={headers} rows={rows} />);
    expect(screen.getByText("Project Name")).toBeInTheDocument();
  });
  it("should render rows", () => {
    render(<TableContainer headers={headers} rows={rows} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
