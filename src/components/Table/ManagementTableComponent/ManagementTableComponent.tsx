import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IColumns from "../../../models/interfaces/IColumns";
import ManagementRowComponent from "../ManagementRowComponent/ManagementRowComponent";

import { getName } from "../../../utils/utilityFunctions";

interface Props {
  columns: IColumns;
  rows: any[];
  selectedItem: any;
}

export default function ManagementTableComponent({
  rows,
  columns,
  selectedItem,
}: Props) {
  function handleSelection(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) {
    selectedItem.current = rows[Number(event.currentTarget.id)];
  }
  //make row in header with add in second colum align to right
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.topics[0] === "projectName" ? (
                <>
                  <TableCell align={"left"}></TableCell>
                  <TableCell align={"right"}>+ ADD PROJECT</TableCell>
                </>
              ) : (
                <TableCell align={"right"}>+ ADD SKILL</TableCell>
              )}
            </TableRow>
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
                  {getName(column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((thisRow, idx) => (
              <ManagementRowComponent
                key={idx}
                row={thisRow}
                columns={columns}
                handleSelection={handleSelection}
                index={idx}
                selectedRow={selectedItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
