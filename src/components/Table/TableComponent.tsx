import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import IColumns from "../../models/interfaces/IColumns";

interface Props {
  columns: IColumns;
  rows: any[];
}

// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;

// }

// function createData(
//   name: string,
//   code: string,
//   fav: boolean,
//   population: number,
//   size: number,
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', false, 1324171354, 3287263),
//   createData('China', 'CN', false, 1403500365, 9596961),
//   createData('Italy', 'IT', true, 60483973, 301340),
//   createData('United States', 'US',false, 327167434, 9833520),
//   createData('Canada', 'CA', true, 37602103, 9984670),
//   createData('Australia', 'AU', false,25475400, 7692024),
//   createData('Germany', 'DE',false, 83019200, 357578),
//   createData('Ireland', 'IE',false, 4857000, 70273),
//   createData('Mexico', 'MX',false, 126577691, 1972550),
//   createData('Japan', 'JP', false, 126317000, 377973),
//   createData('France', 'FR', false, 67022000, 640679),
//   createData('United Kingdom', 'GB', false, 67545757, 242495),
//   createData('Russia', 'RU', false,146793744, 17098246),
//   createData('Nigeria', 'NG',false, 200962417, 923768),
//   createData('Brazil', 'BR', false, 210147125, 8515767),
// ];
let selectedItems: string[] = [];
function handleSelection(
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) {
  // console.log(event);
  // console.log(event.currentTarget.value);
  if (checked) {
    selectedItems.push(event.currentTarget.value);
  } else {
    selectedItems = selectedItems.filter(
      (id) => id != event.currentTarget.value
    );
  }
}

export default function TableComponent({ rows, columns }: Props) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ maxWidth: 50 }}></TableCell>
              {columns.topics.map((column: string, index) => (
                <TableCell key={index} align={"right"} style={{ minWidth: 50 }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>
                    {/* we need to make sure objects have id inorder to grab them for selection. */}
                    <Checkbox
                      color="primary"
                      onChange={handleSelection}
                      value={row.some}
                      inputProps={{}}
                    />
                  </TableCell>
                  {columns.topics.map((column: string, index) => {
                    return (
                      <TableCell key={index} align={"right"}>
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
