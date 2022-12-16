import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./FormComponent.css";

const inputStyle = (theme: any) => ({
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#d9d9d9",
  borderRadius: "10px",
  width: "80%",
  padding: "1rem",
  marginTop: "1rem",
  marginBottom: "2.875rem",
  input: {
    "&::placeholder": {
      fontWeight: "700",
      fontSize: "14px",
    },
  },
  textarea: {
    "&::placeholder": {
      fontWeight: "700",
      fontSize: "14px",
    },
  },
});

function FormComponent(props: any) {
  const inputProps = {
    style: {
      padding: 0,
    },
    readOnly: props.readonly,
    maxLength: 255,
  };

  const InputProps = {
    disableUnderline: true,
  };

  const [techStack, setTechStack] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setTechStack(event.target.value as string);
  };

  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const regexp = new RegExp("^[a-zA-Z0-9_]*$");

  useEffect(() => {
    if (!regexp.test(text)) {
      setErrorMessage("error");
    }
  }, [text]);

  useEffect(() => {
    if (regexp.test(text)) {
      setErrorMessage("");
    }
  }, [text, errorMessage]);

  return (
    <div className="form-component">
      <h3 data-testid="title">{props.title}</h3>
      <form>
        <div className="input-order">
          <div className="column">
            <TextField
              error={text.length > 0}
              required
              inputProps={inputProps}
              InputProps={InputProps}
              placeholder="project name"
              variant="standard"
              onChange={(e) => setText(e.target.value)}
              sx={inputStyle}
            />
            <TextField
              error
              required
              inputProps={{
                style: {
                  padding: 0,
                },
                readOnly: props.readonly,
                pattern:
                  "^(http(s)://.)[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$",
              }}
              InputProps={InputProps}
              placeholder="link to project repository"
              variant="standard"
              sx={inputStyle}
            />
            <TextField
              multiline
              rows={4}
              inputProps={{
                style: {
                  padding: 0,
                },
                readOnly: props.readonly,
              }}
              InputProps={InputProps}
              placeholder="project summary"
              variant="standard"
              sx={inputStyle}
            />
          </div>
          <div className="column">
            <FormControl
              sx={{
                "& .MuiFormLabel-root": {
                  fontFamily: "Darker Grotesque",
                  fontWeight: "700",
                  color: "#8A8B8A",
                  fontSize: "18px",
                  paddingTop: "1rem",
                },
                "& .MuiSelect-select": {
                  padding: "1rem",
                },
              }}
            >
              <InputLabel>tech stack</InputLabel>
              <Select
                required
                variant="standard"
                disableUnderline
                sx={{
                  backgroundColor: "#d9d9d9",
                  borderRadius: "10px",
                  width: "80%",
                }}
                onChange={handleChange}
                value={techStack}
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="buttons-margin">
          <div className="buttons">
            <button className="blue-button">Cancel</button>
            <button className="blue-button">Reset</button>
            <button className="orange-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
