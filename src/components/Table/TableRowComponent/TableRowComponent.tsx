import { TableCell, TableRow, Tooltip } from "@mui/material";
import { Fragment } from "react";
import IColumns from "../../../models/interfaces/IColumns";
import IEnableeTable from "../../../models/interfaces/IEnableeTable";

interface Props {
  row: IEnableeTable;
  columns: IColumns;
  handleSelection: () => void;
  index: number;
  selectedRows: string[];
}

export default function TableRowComponent({
  columns,
  row,
  handleSelection,
  index,
  selectedRows,
}: Props) {
  let rowColor = "";
  index % 2 === 0 ? (rowColor = "#CCCCDA") : (rowColor = "#E6E8E6");
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={index}
      onClick={handleSelection}
      id={row.id}
      sx={{
        backgroundColor: selectedRows.includes(row.id) ? "#000048" : rowColor,
        color: selectedRows.includes(row.id) ? "#CCCCDA" : "#000048",
        border: "5px solid black",
        "&.MuiTableRow-root:hover": {
          cursor: "pointer",
          backgroundColor: "#DC8D0B",
          color: "#000048",
        },
      }}
    >
      {columns.topics.map((column, idx) => (
        <Fragment key={idx}>
          {column === "techStack" ? (
            <Tooltip title="test" placement="bottom">
              <TableCell
                align={"left"}
                sx={{
                  fontSize: "18px",
                  border: "none",
                  color: "inherit",
                }}
              >
                {row[column]}
              </TableCell>
            </Tooltip>
          ) : (
            <TableCell
              align={"left"}
              sx={{
                fontSize: "18px",
                border: "none",
                color: "inherit",
              }}
            >
              {row[column]}
            </TableCell>
          )}
        </Fragment>
      ))}
    </TableRow>
  );
}
