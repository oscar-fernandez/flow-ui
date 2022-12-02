import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import IColumns from "../../models/interfaces/IColumns";

interface Props {
  columns: IColumns;
  rows: any[];
  selectedItems: string[];
}

export default function TableComponent({
  rows,
  columns,
  selectedItems,
}: Props) {
  function handleSelection(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    if (checked) {
      selectedItems.push(event.currentTarget.value);
      selectedItems = [""];
    } else {
      selectedItems = [""];
    }
    // (id: string) => id != event.currentTarget.value
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ maxWidth: 50, background: "#E6E8E6" }}
              ></TableCell>
              {columns.topics.map((column: string, index) => (
                <TableCell
                  key={index}
                  align={"left"}
                  style={{
                    minWidth: 50,
                    background: "#E6E8E6",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#000048",
                    borderLeft: "1px solid #000048",
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              let rowStyle = "";
              idx % 2 === 0 ? (rowStyle = "#CCCCDA") : (rowStyle = "#E6E8E6");
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  style={{
                    background: rowStyle,
                  }}
                >
                  <TableCell>
                    {/* we need to make sure objects have id inorder to grab them for selection. */}
                    <Checkbox
                      color="primary"
                      onChange={handleSelection}
                      value={row.some}
                    />
                  </TableCell>
                  {columns.topics.map((column: string, index) => {
                    return (
                      <TableCell
                        key={index}
                        align={"left"}
                        style={{ fontSize: "18px" }}
                      >
                        {row[column]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
