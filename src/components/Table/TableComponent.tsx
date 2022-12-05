import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
  const [selectedRows, setSelectedRows] = useState([""]);
  function handleSelection(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) {
    if (!selectedItems.includes(event.currentTarget.id)) {
      selectedItems.push(event.currentTarget.id);
      setSelectedRows([...selectedItems, event.currentTarget.id]);
    } else {
      selectedItems.splice(selectedItems.indexOf(event.currentTarget.id), 1);
      setSelectedRows([...selectedItems]);
    }
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
            {rows.map((row, index) => {
              let rowStyle = "";
              index % 2 === 0 ? (rowStyle = "#CCCCDA") : (rowStyle = "#E6E8E6");
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onClick={(e) => handleSelection(e)}
                  id={row.id}
                  sx={{
                    bgcolor: selectedRows.includes(row.id)
                      ? "red !important"
                      : "blue !important",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
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
