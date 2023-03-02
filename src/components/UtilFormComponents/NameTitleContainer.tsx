import { TextField } from "@mui/material";
import { InputProps, titleProps } from "./FormStyles";

//will need to pass value and handler for title
interface Props {
  firstName: string;
  lastName: string;
}

export default function NameTitleContainer({ firstName, lastName }: Props) {
  return (
    <>
      <TextField
        variant="standard"
        autoComplete="off"
        placeholder="* Untitled"
        InputProps={InputProps}
        inputProps={{ "data-testid": "enableeName" }}
        sx={titleProps}
        value={firstName.length > 0 ? `${firstName} ${lastName}` : ""}
        // onChange={NameChangeHandler}
      />
    </>
  );
}
