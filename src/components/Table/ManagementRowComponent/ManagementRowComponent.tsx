import { TableCell, TableRow, Tooltip } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import IColumns from "../../../models/interfaces/IColumns";
import IProjectTable from "../../../models/interfaces/IProjectTable";
import {
  shortenStringList,
  convertToStringArr,
  tooltipString,
} from "../../../utils/utilityFunctions";

interface Props {
  row: any;
  columns: IColumns;
  handleSelection: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  index: number;
  selectedRow: any;
}

export default function ManagementRowComponent({
  columns,
  row,
  handleSelection,
  index,
  selectedRow,
}: Props) {
  //const thisObject : any = row;
  const [useTechStack, setTechStack] = useState("");
  const strTechStack = useRef([""]);

  useEffect(() => {
    strTechStack.current = [...convertToStringArr(row.techStack)];
    setTechStack(shortenStringList(strTechStack.current));
  }, []);

  let rowColor = "";
  index % 2 === 0 ? (rowColor = "#CCCCDA") : (rowColor = "#E6E8E6");
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={index}
      onClick={handleSelection}
      id={index.toString()}
      // sx={{
      //   backgroundColor: selectedRows.includes(row.id) ? "#000048" : rowColor,
      //   color: selectedRows.includes(row.id) ? "#CCCCDA" : "#000048",
      //   border: "5px solid black",
      //   "&.MuiTableRow-root:hover": {
      //     cursor: "pointer",
      //     backgroundColor: "#DC8D0B",
      //     color: "#000048",
      //   },
      // }}
    >
      {columns.topics.map((column, idx) => (
        <Fragment key={idx}>
          {column === "techStack" ? (
            <Tooltip
              title={tooltipString(strTechStack.current)}
              placement="bottom"
            >
              <TableCell
                align={"left"}
                sx={{
                  fontSize: "18px",
                  border: "none",
                  color: "inherit",
                }}
              >
                {useTechStack}
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
