import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";

const selectStyle = {
  color: "#8A8B8A",
  fontSize: "15px",
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
};

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
    <div>
      <FormControl sx={{ width: 120 }}>
        <Select
          disableUnderline
          variant="standard"
          displayEmpty
          value={value}
          onChange={setValue}
          inputProps={{ IconComponent: () => null }}
          sx={selectStyle}
        >
          <MenuItem disabled value="" sx={selectStyle}>
            {label}
          </MenuItem>
          {selectArray.map((element, i) => {
            return (
              <MenuItem key={i} value={element} sx={selectStyle}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
