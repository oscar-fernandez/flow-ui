import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { SxProps, Theme } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import CustomTableRow from "./CustomTableRow";
import TableHeader from "./TableHeader";
import React, { useState } from "react";
import TableInput from "./TableInput";

interface Props {
  clickable?: boolean;
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
  toggleShowForm: () => void;
  buttonStyle?: any;
  toggleIndex?: number;
}

const CustomTableContainer = ({
  clickable,
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
  toggleShowForm,
  buttonStyle,
  toggleIndex,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        marginBottom: "40px",
      }}
    >
      <TableContainer data-testid="table-container" sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader
            headers={headers}
            headerStyle={headerStyle}
            buttonStyle={buttonStyle}
            toggleShowForm={toggleShowForm}
            value={value}
          />

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
                clickable={clickable}
                key={r[0]}
                rowId={index.toString()}
                row={r}
                rowStyle={rowStyle}
                cellStyle={cellStyle}
                index={index}
                customHandleSelection={() => {
                  if (selectedIndex === index) setSelectedIndex(-1);
                  else setSelectedIndex(index);
                  customHandleSelection;
                }}
                updateSelectedEnablees={updateSelectedEnablees}
                skill={skill}
                toggle={selectedIndex === index || index === toggleIndex}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTableContainer;
