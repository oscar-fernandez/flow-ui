import { TextField } from "@mui/material";
import { InputProps, titleProps } from "./FormStyles";

//will need to pass value and handler for title

export default function TitleContainer() {
  return (
    <>
      <TextField
        variant="standard"
        autoComplete="off"
        placeholder="* Untitled"
        InputProps={InputProps}
        inputProps={{ "data-testid": "enableeName" }}
        sx={titleProps}
        // value={
        //   enabler.firstName.length > 0
        //     ? `${enabler.firstName} ${enabler.lastName}`
        //     : null
        // }
        // onChange={NameChangeHandler}
      />
    </>
  );
}
