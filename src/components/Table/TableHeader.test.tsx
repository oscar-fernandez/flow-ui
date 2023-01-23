import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import TableHeader from "./TableHeader";
import { Table, TableContainer } from "@mui/material";

const headers = ["A", "B", "C"];
const headerStyle = { color: "red" };
const value = "value";
const buttonStyle = { color: "blue" };
const toggleShowForm = () => {
  return false;
};
//higher order component
//here to prevent tr in div warning
const hoc = (child: JSX.Element) => (
  <TableContainer>
    <Table>{child}</Table>
  </TableContainer>
);

describe("TableHeader", () => {
  it("should render the correct headers", () => {
    render(
      hoc(
        <TableHeader
          headers={headers}
          headerStyle={headerStyle}
          value={value}
          buttonStyle={buttonStyle}
          toggleShowForm={toggleShowForm}
        />
      )
    );
    expect(screen.getByTestId("table-header")).toBeInTheDocument();
    headers.forEach((header) => {
      expect(screen.getByTestId(header)).toBeInTheDocument();
    });
  });
});
