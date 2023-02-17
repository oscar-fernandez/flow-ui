import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { labelStyle, selectStyle } from "./FormStyles";

interface Props {
  value: string;
  setValue: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  selectArray: string[];
  label: string;
}

export default function SelectDropdown({
  value,
  setValue,
  selectArray,
  label,
}: Props) {
  return (
    <>
      <Typography sx={labelStyle}>{label}</Typography>
      <FormControl sx={{ width: 120 }}>
        <Select
          value={value}
          displayEmpty
          disableUnderline
          variant="standard"
          onChange={setValue}
          data-testid={label}
          inputProps={{ IconComponent: () => null }}
          sx={
            value
              ? selectStyle
              : { ...selectStyle, color: "rgba(138, 139, 138, 0.4)" }
          }
        >
          <MenuItem disabled value="" sx={selectStyle}>
            {"* Empty"}
          </MenuItem>
          {selectArray.map((element, i) => {
            return (
              <MenuItem
                key={i}
                value={element}
                data-testid={element}
                sx={selectStyle}
              >
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
