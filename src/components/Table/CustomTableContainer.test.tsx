import { screen, render, fireEvent, prettyDOM } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CustomTableContainer from "./CustomTableContainer";
const headers = ["Project Name", "Tech Stack"];
const rows = [["A"], ["B"]];

describe("TableView tests", () => {
  it("should render", () => {
    render(<CustomTableContainer headers={headers} rows={rows} />);
    expect(screen.getByTestId("table-container")).toBeInTheDocument();
  });
  it("should render headers", () => {
    render(<CustomTableContainer headers={headers} rows={rows} />);
    expect(screen.getByText("Project Name")).toBeInTheDocument();
  });
  it("should render rows", () => {
    render(<CustomTableContainer headers={headers} rows={rows} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should change row background color when clicked", () => {
    render(<CustomTableContainer headers={headers} rows={rows} />);
    const row = screen.getAllByTestId("table-row")?.[0];
    expect(row).toBeInTheDocument();
    expect(row).toHaveStyle("background-color: #CCCCDA");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #000048");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #CCCCDA");
  });
});
