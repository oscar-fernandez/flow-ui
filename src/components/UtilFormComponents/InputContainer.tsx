import { TextField, Typography } from "@mui/material";
import { InputProps, inputStyle, labelStyle } from "./FormStyles";

// value and on change will be needed here
interface Props {
  type?: string;
  label: string;
  required?: boolean;
}

export default function InputContainer({
  type = "text",
  label,
  required = false,
}: Props) {
  return (
    <>
      <Typography sx={labelStyle}>{label}</Typography>
      <TextField
        type={type}
        variant="standard"
        autoComplete="off"
        InputProps={InputProps}
        placeholder={required ? "* Empty" : "Empty"}
        inputProps={{ "data-testid": "employeeId" }}
        sx={inputStyle}
        // value={enabler.employeeId === -1 ? "" : enabler.employeeId}
        // onChange={employeeIdChangeHandler}
      />
    </>
  );
}
