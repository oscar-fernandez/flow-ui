import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { SxProps, Theme } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import CustomTableRow from "./CustomTableRow";
import TableHeader from "./TableHeader";
import React from "react";
import TableInput from "./TableInput";

interface Props {
  headers: string[];
  headerStyle?: SxProps<Theme>;
  rows: string[][];
  rowStyle?: SxProps<Theme>;
  cellStyle?: SxProps<Theme>;
  customHandleSelection?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  updateSelectedEnablees?: (index: number) => void;
  skill: boolean;
  value: string;
  setTechnology?: (tech: string) => void;
  setSkill?: (skill: boolean) => void;
}

const CustomTableContainer = ({
  headers,
  rows,
  headerStyle,
  rowStyle,
  cellStyle,
  customHandleSelection,
  updateSelectedEnablees,
  setTechnology,
  setSkill,
  skill,
  value,
}: Props) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer data-testid="table-container" sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader headers={headers} headerStyle={headerStyle} />
          {skill && value === "Technology" && (
            <TableInput
              setTechnology={setTechnology}
              setSkill={setSkill}
              skill={skill}
            ></TableInput>
          )}
          <TableBody>
            {rows.map((r: string[], index: number) => (
              <CustomTableRow
                key={index}
                rowId={index.toString()}
                row={r}
                rowStyle={rowStyle}
                cellStyle={cellStyle}
                index={index}
                customHandleSelection={customHandleSelection}
                updateSelectedEnablees={updateSelectedEnablees}
                skill={skill}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTableContainer;
