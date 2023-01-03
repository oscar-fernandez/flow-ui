import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import TableHeader from "./TableHeader";
import { Table, TableContainer } from "@mui/material";

const headers = ["A", "B", "C"];

//higher order component
//here to prevent tr in div warning
const hoc = (child: JSX.Element) => (
  <TableContainer>
    <Table>{child}</Table>
  </TableContainer>
);

describe("TableHeader Unit tests", () => {
  it("should render", () => {
    render(hoc(<TableHeader headers={headers} headerStyle={null} />));
    expect(screen.getByTestId("table-header")).toBeInTheDocument();
  });

  it("should render list of header items", () => {
    render(hoc(<TableHeader headers={headers} headerStyle={null} />));
    expect(screen.getByTestId("A")).toHaveTextContent("A");
  });
});
