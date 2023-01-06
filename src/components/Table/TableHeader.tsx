import { SxProps, TableCell, TableHead, TableRow, Theme } from "@mui/material";
import CustomTableButton from "./CustomTableButton";

interface Props {
  headers: string[];
  headerStyle?: SxProps<Theme>;
  value: string;
  buttonStyle: any;
  toggleShowForm: () => void;
}

const TableHeader = ({
  headers,
  headerStyle,
  value,
  buttonStyle,
  toggleShowForm,
}: Props) => {
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {header}
              {index === headers.length - 1 && (
                <CustomTableButton
                  value={value}
                  buttonStyle={buttonStyle}
                  customHandleClick={toggleShowForm}
                />
              )}
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
