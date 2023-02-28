import { Typography } from "@mui/material";
import { labelStyle } from "./FormStyles";

// checked value will need to go here and onchange method
interface Props {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

export default function Checkbox({ label, onChange, value }: Props) {
  return (
    <>
      <Typography sx={labelStyle}>{label}</Typography>
      <div>
        <input
          type="checkbox"
          data-testid="isEmployed"
          checked={value}
          onChange={onChange}
        ></input>
      </div>
    </>
  );
}
