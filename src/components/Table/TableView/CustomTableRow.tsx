import { useState } from "react";
import { SxProps, TableCell, TableRow, Theme } from "@mui/material";

interface Props {
  rowId: string,
  row: string[],
  rowStyle: SxProps<Theme>,
  cellStyle: SxProps<Theme>,
  customHandleSelection ?: 
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void,
  updateSelectedEnablees ?: (index:number) => void,
  index: number,
}

export default function CustomRowComponent({
  rowId,
  row,
  rowStyle,
  cellStyle,
  customHandleSelection,
  updateSelectedEnablees, //currently only used in defaultHandleSelection, will not be called when customHandleSelects for now
  index,
}: Props
) {
  const [toggle, setToggle] = useState(false);
  const defaultHandleSelection = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    setToggle(!toggle);
    updateSelectedEnablees?.(+e.currentTarget.id); //check updateSelectedEnablees could be undefined
  }

  let rowColor = "";
  index % 2 === 0 ? (rowColor = "#CCCCDA") : (rowColor = "#E6E8E6");
  return (
    <TableRow
      id={rowId}
      hover
      tabIndex={-1}
      onClick={customHandleSelection || defaultHandleSelection}
      sx={
     {
       ...rowStyle,
       backgroundColor: toggle ? "#000048" : rowColor,
       color: toggle ? "#CCCCDA" : "#000048",
      }
    }
    >
       {
         row.map( (r:string, index:number) => (
           <TableCell
           title={r}
            key={index}
            align={"left"}
            sx={cellStyle}
            >
            {r}
          </TableCell>
        ))
      }
     </TableRow>
  );
}
