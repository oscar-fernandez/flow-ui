import { SxProps, TableCell, TableHead, TableRow, Theme } from "@mui/material";

interface Props {
  headers: string[];
  headerStyle?: SxProps<Theme>;
}

const TableHeader = ({ headers, headerStyle }: Props) => {
  return (
    <TableHead data-testid="table-header">
      <TableRow>
        {headers.map((header: string, index) => (
          <TableCell
            data-testid={header}
            key={index}
            align={"left"}
            sx={headerStyle}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
