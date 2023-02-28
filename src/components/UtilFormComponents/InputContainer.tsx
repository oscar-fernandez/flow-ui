import { TextField, Typography } from "@mui/material";
import { InputProps, inputStyle, labelStyle } from "./FormStyles";

// value and on change will be needed here
interface Props {
  type?: string;
  label: string;
  required?: boolean;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

export default function InputContainer({
  type = "text",
  label,
  value,
  required = false,
  onChange,
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
        value={value}
        onChange={onChange}
      />
    </>
  );
}
