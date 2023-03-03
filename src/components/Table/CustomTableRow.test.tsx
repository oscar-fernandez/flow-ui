import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import CustomeTableRow from "./CustomTableRow";
import { Table, TableBody, TableContainer } from "@mui/material";

const rows = ["A", "B", "C"];

//higher order component
//here to prevent tr in div warning
const hoc = (child: JSX.Element) => (
  <TableContainer>
    <Table>
      <TableBody>{child}</TableBody>
    </Table>
  </TableContainer>
);

describe("TableHeader Unit tests", () => {
  it("should render", () => {
    render(
      hoc(
        <CustomeTableRow
          rowId={""}
          row={[]}
          index={0}
          skill={false}
          toggle={false}
        />
      )
    );
    expect(screen.getByTestId("table-row")).toBeInTheDocument();
  });

  it("should render list of header items", () => {
    render(
      hoc(
        <CustomeTableRow
          rowId={""}
          row={rows}
          index={0}
          skill={false}
          toggle={false}
        />
      )
    );
    expect(screen.getByTestId("A")).toHaveTextContent("A");
  });
});
