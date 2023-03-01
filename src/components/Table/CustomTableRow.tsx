import { useState } from "react";
import { SxProps, TableCell, TableRow, Theme } from "@mui/material";

interface Props {
  clickable?: boolean;
  rowId: string;
  row: string[];
  rowStyle?: SxProps<Theme>;
  cellStyle?: SxProps<Theme>;
  customHandleSelection?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  updateSelectedEnablees?: (index: number) => void;
  index: number;
  skill: boolean;
  toggle: boolean;
}

export default function CustomRowComponent({
  clickable,
  rowId,
  row,
  rowStyle,
  cellStyle,
  customHandleSelection,
  updateSelectedEnablees, //currently only used in defaultHandleSelection, will not be called when customHandleSelects for now
  index,
  skill,
  toggle,
}: Props) {
  const defaultHandleSelection = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    updateSelectedEnablees?.(+e.currentTarget.id) ||
      (customHandleSelection && customHandleSelection(e));
  };

  let rowColor = "";
  index % 2 === 0 ? (rowColor = "#CCCCDA") : (rowColor = "#E6E8E6");
  return (
    <>
      <TableRow
        data-testid="table-row"
        id={rowId}
        hover
        tabIndex={-1}
        onClick={defaultHandleSelection}
        sx={{
          ...rowStyle,
          backgroundColor: toggle ? "#000048" : rowColor,
          color: toggle ? "#CCCCDA" : "#000048",
        }}
      >
        {row.map((r: string, index: number) => (
          <TableCell
            data-testid={r}
            //  title={r}
            key={index}
            align={"left"}
            sx={cellStyle}
          >
            {r}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}
