import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ButtonGroup,
  Button,
} from "@mui/material";
import { useState } from "react";
import ITechnology from "../../models/interfaces/ITechnology";
import "./FormComponent.css";

const inputStyle = () => ({
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#d9d9d9",
  borderRadius: "10px",
  width: "23.5rem",
  padding: "1rem",
  marginTop: "1rem",
  marginBottom: "2.875rem",
  input: {
    "&::placeholder": {
      fontWeight: "700",
      fontSize: "16px",
      color: "black",
      letterSpacing: "0.025em",
    },
    "&:invalid": {
      color: "red",
      caretColor: "black",
    },
  },
  textarea: {
    "&::placeholder": {
      fontWeight: "700",
      fontSize: "16px",
      letterSpacing: "0.025em",
    },
  },
});

const InputProps = {
  disableUnderline: true,
};

export default function FormComponent(props: any) {
  const ts: ITechnology[] = [
    { id: 0, name: "Java", backgroundColor: "grey" },
    { id: 1, name: "React", backgroundColor: "blue" },
    { id: 2, name: "SpringBoot", backgroundColor: "green" },
    { id: 3, name: "Jenkins", backgroundColor: "black" },
    { id: 4, name: "Docker", backgroundColor: "darkblue" },
    { id: 5, name: "Angular", backgroundColor: "red" },
  ];

  const inputProps = {
    style: {
      padding: 0,
    },
    readOnly: props.readonly,
  };

  //manages array of string for select
  const [techStackString, setTechStackString] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof techStackString>) => {
    const {
      target: { value },
    } = event;
    setTechStackString(typeof value === "string" ? value.split(",") : value);
  };

  const clearFields = () => {
    const projectName = document.getElementById(
      "projectName"
    ) as HTMLInputElement;
    const repoLink = document.getElementById("link") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    projectName.value = "";
    repoLink.value = "";
    summary.value = "";
    setTechStackString([]);
  };

  const handleTechStack = (value: string) => {
    techStackString.push(value);
  };

  //input field value
  let name,
    link,
    summ = "";

  if (props.selectedRow != "") {
    name = props.selectedRow?.current?.name;
    link = props.selectedRow?.current?.repoLink;
    summ = props.selectedRow?.current?.summary;
  }

  return (
    <div className="form-component">
      <div style={{ width: "48%" }}>
        <h3 data-testid="title">{props.title}</h3>
      </div>
      <form>
        <div style={{ display: "flex" }}>
          <div className="column-l">
            <div className="form-wrap">
              <label className="p-label">Project Name</label>
              <TextField
                className="form-field"
                error
                required
                id="projectName"
                name="projectName"
                inputProps={{
                  ...inputProps,
                  maxLength: 255,
                  pattern: "^[a-zA-Z0-9_-]*$",
                }}
                InputProps={InputProps}
                placeholder="project name"
                variant="standard"
                autoComplete="off"
                defaultValue={name}
              />
            </div>
            <div className="form-wrap">
              <label className="p-label">
                Link to <br /> Repository
              </label>
              <TextField
                className="form-field"
                error
                required
                id="link"
                name="link"
                inputProps={{
                  ...inputProps,
                  pattern:
                    "^(https://git.work.cognizant.studio/enablement/team-projects/\\S+)",
                }}
                InputProps={InputProps}
                placeholder="link to project repository"
                variant="standard"
                autoComplete="off"
                defaultValue={link}
              />
            </div>
            <div className="form-wrap">
              <label className="p-label">Project Summary</label>
              <TextField
                className="form-field"
                error
                required
                id="summary"
                name="summary"
                multiline
                rows={4}
                inputProps={inputProps}
                InputProps={InputProps}
                placeholder="project summary"
                variant="standard"
                autoComplete="off"
                defaultValue={summ}
              />
            </div>
          </div>
          <div className="column-r">
            <div className="form-wrap">
              <label className="p-label">Tech Stack</label>
              <ButtonGroup
                variant="text"
                orientation="vertical"
                aria-label="text button group"
              >
                {ts.map((tech) => (
                  <Button
                    key={tech.id}
                    onClick={() => {
                      handleTechStack(tech.name);
                    }}
                  >
                    {tech.name}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div className="button-wrap">
              {techStackString.length > 0 ? (
                <p className="selected-ts">
                  Selected tech stack: {techStackString.join(", ")}
                </p>
              ) : (
                <p className="selected-ts">Selected tech stack: None</p>
              )}
            </div>
            <div className="buttons">
              {props.edit === false ? (
                <>
                  <button className="blue-button" onClick={props.handleClick}>
                    Cancel
                  </button>
                  <button
                    className="reset-btn"
                    data-testid="reset"
                    onClick={clearFields}
                  >
                    Reset
                  </button>
                  <button className="orange-button">Submit</button>
                </>
              ) : (
                <>
                  <button className="blue-button" onClick={props.handleClick}>
                    Back to Projects...
                  </button>
                  <button className="orange-button" onClick={props.handleEdit}>
                    Edit Project
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
