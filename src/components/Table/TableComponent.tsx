import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IColumns from "../../models/interfaces/IColumns";
import Tooltip from "@mui/material/Tooltip";

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
            <TableRow sx={{}}>
              {columns.topics.map((column: string, index) => (
                <TableCell
                  key={index}
                  align={"left"}
                  sx={{
                    minWidth: 50,
                    background: "#E6E8E6",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#000048",
                    borderRight: "1px solid #000048",
                    "&:last-child": { borderRight: "none" },
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              let rowColor = "";
              index % 2 === 0 ? (rowColor = "#CCCCDA") : (rowColor = "#E6E8E6");
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onClick={handleSelection}
                  id={row.id}
                  sx={{
                    backgroundColor: selectedRows.includes(row.id)
                      ? "#000048"
                      : rowColor,
                    color: selectedRows.includes(row.id)
                      ? "#CCCCDA"
                      : "#000048",
                    border: "5px solid black",
                    "&.MuiTableRow-root:hover": {
                      cursor: "pointer",
                      backgroundColor: "#DC8D0B",
                      color: "#000048",
                    },
                  }}
                >
                  {columns.topics.map((column: string, index) => {
                    return (
                      <TableCell
                        key={index}
                        align={"left"}
                        sx={{
                          fontSize: "18px",
                          border: "none",
                          color: "inherit",
                        }}
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
