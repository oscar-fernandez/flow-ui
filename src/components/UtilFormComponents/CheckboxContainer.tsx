import { Typography } from "@mui/material";
import { labelStyle } from "./FormStyles";

// checked value will need to go here and onchange method
interface Props {
  label: string;
}

export default function Checkbox({ label }: Props) {
  return (
    <>
      <Typography sx={labelStyle}>{label}</Typography>
      <div>
        <input
          type="checkbox"
          data-testid="isEmployed"
          checked={true}
          // checked={enabler.isEmployed}
          // onChange={isEmployedChangeHandler}
        ></input>
      </div>
    </>
  );
}
