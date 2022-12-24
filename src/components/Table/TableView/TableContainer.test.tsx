import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableContainer from "./TableContainer";

describe("TableView tests", () => {
  it("should render", () => {
    render(<TableContainer />);
    expect(screen.getByTestId("table-container")).toBeInTheDocument();
  });
});
