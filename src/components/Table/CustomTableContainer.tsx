import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { SxProps, Theme } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import CustomTableRow from "./CustomTableRow";
import TableHeader from "./TableHeader";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

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
  setTechnology: (tech: string) => void;
  setSkill: (skill: boolean) => void;
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
  const [newTechValue, setNewTechValue] = useState("");

  const handleNewTechEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter") {
      setTechnology(target.value);
      setSkill(!skill);
      setNewTechValue("");
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer data-testid="table-container" sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader headers={headers} headerStyle={headerStyle} />
          {skill && value === "Technology" && (
            <div style={{ marginLeft: "1rem" }}>
              <TextField
                id="newSkill"
                type="text"
                variant="standard"
                autoComplete="off"
                value={newTechValue}
                error={newTechValue.trim().length === 0}
                helperText={newTechValue === "" ? "* Invalid Skill Name" : " "}
                onChange={(e) => setNewTechValue(e.target.value)}
                onKeyDown={handleNewTechEnter}
                inputProps={{
                  "data-testid": "input",
                  style: { padding: "14.5px 0px" },
                }}
              />
            </div>
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
