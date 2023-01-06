import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { SxProps, Theme } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import CustomTableRow from "./CustomTableRow";
import TableHeader from "./TableHeader";
import TextField from "@mui/material/TextField";
import { useState } from "react";

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
  toggleShowForm?: () => void;
  buttonStyle?: any;
}

const CustomTableContainer = ({
  headers,
  rows,
  headerStyle,
  rowStyle,
  cellStyle,
  customHandleSelection,
  updateSelectedEnablees,
  skill = false,
  value,
  toggleShowForm,
  buttonStyle,
}: Props) => {
  const [newTechValue, setNewTechValue] = useState("");
  const [techError, setTechError] = useState(false);

  function handleNewTechValue(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTechValue(event.target.value);

    if (event.target.value.trim().length === 0) {
      setTechError(true);
    } else {
      setTechError(false);
    }
  }

  // const handleNewTechEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if(event.key==='Enter'){
  //     //post to tech list here
  //     console.log(newTechValue)
  //     skill = false;
  //   }
  // }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            <label htmlFor="search">
              <TextField
                id="search"
                inputProps={{ "data-testid": "input" }}
                type="text"
                onChange={handleNewTechValue}
                /*onKeyDown={handleNewTechEnter}*/ required
                value={newTechValue}
              />
              {techError == true && (
                <>
                  <p>Invalid Technology Name</p>
                </>
              )}
            </label>
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
