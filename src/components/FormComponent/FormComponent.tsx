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
import IProject from "../../models/interfaces/IProject";
import { updateProject, createProject } from "../../services/ManagementAPI";
import { TagComponent } from "../TagComponent/Tag";

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
  const inputProps = {
    style: {
      padding: 0,
      fontSize: "15px",
      fontWeight: 600,
      color: "rgba(138, 139, 138, 0.4)",
    },
    readOnly: props.readonly,
  };

  const [techStack, setTechStack] = useState(props.allTechnologies);
  const [selectedStack, setSelectedStack] = useState(props.technologies);

  const clearFields = () => {
    const projectName = document.getElementById(
      "projectName"
    ) as HTMLInputElement;
    const repoLink = document.getElementById("link") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    projectName.value = "";
    repoLink.value = "";
    summary.value = "";
    setTechStack([]);
  };

  const handleTechStack = (value: ITechnology) => {
    const found = selectedStack.find(
      (tech: ITechnology) => tech.id === value.id
    );
    const notFound = selectedStack.filter(
      (tech: ITechnology) => tech.id !== value.id
    );
    if (found) {
      setSelectedStack(notFound);
    } else {
      setSelectedStack([...selectedStack, value]);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (props.title === "Add Project") {
      const newProject: IProject = formHelper(0);
      const savedProject = await createNewProject(newProject);
      if (JSON.stringify(savedProject) != "{}") {
        props.handleProjectChange(savedProject);
      }
    } else {
      const updatedProject: IProject = formHelper(
        props.selectedRow?.current?.id
      );
      const savedProject = await updateProjectChange(updatedProject);
      if (JSON.stringify(savedProject) != "{}") {
        props.handleProjectChange(savedProject);
      }
    }
    props.handleClick();
  };

  const createNewProject = async (project: IProject) => {
    let newProject = {};

    try {
      const resp = await createProject(project);
      newProject = resp.data;
    } catch (error) {
      console.error(error);
    }

    return newProject;
  };

  const updateProjectChange = async (project: IProject) => {
    let updatedProject = {};

    try {
      const resp = await updateProject(project);
      updatedProject = resp.data;
    } catch (error) {
      console.error(error);
    }
    return updatedProject;
  };

  const formHelper = (id: number) => {
    let techArr: ITechnology[] = [];

    techArr = techStack;

    const currentProjectName = document.getElementById(
      "projectName"
    ) as HTMLInputElement;
    const currentRepoLink = document.getElementById("link") as HTMLInputElement;
    const currentProjectsummary = document.getElementById(
      "summary"
    ) as HTMLInputElement;

    const project: IProject = {
      id: id,
      name: currentProjectName.value,
      summary: currentProjectsummary.value,
      technology: techArr,
      repoLink: currentRepoLink.value,
    };

    return project;
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
                data-testid="pName"
                id="projectName"
                name="projectName"
                inputProps={{
                  ...inputProps,
                  maxLength: 255,
                  pattern: "^[a-zA-Z0-9_-]*$",
                }}
                InputProps={InputProps}
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                defaultValue={name}
              />
            </div>
            <div className="form-wrap">
              <label className="p-label">
                Link to Project
                <br /> Repository
              </label>
              <TextField
                className="form-field"
                error
                required
                data-testid="pLink"
                id="link"
                name="link"
                inputProps={{
                  ...inputProps,
                  pattern:
                    "^(https://git.work.cognizant.studio/enablement/team-projects/\\S+)",
                }}
                InputProps={InputProps}
                placeholder="Empty"
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
                data-testid="pDesc"
                id="summary"
                name="summary"
                multiline
                rows={4}
                inputProps={inputProps}
                InputProps={InputProps}
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                defaultValue={summ}
              />
            </div>
          </div>
          <div className="column-r">
            <div className="tech-wrap">
              <label className="p-label">Technologies</label>
              <div className="tech-stack">
                {techStack.map((tech: ITechnology) => (
                  <MenuItem
                    key={tech.id}
                    className="tech-item"
                    disabled={props.edit}
                    onClick={() => {
                      handleTechStack(tech);
                    }}
                  >
                    {tech.name}
                  </MenuItem>
                ))}
              </div>
            </div>
            <div className="button-wrap">
              {selectedStack.length > 0 ? (
                <div className="selected-tag-wrap">
                  <label className="t-label">Current Tech Stack: </label>
                  <div className="selected-tags">
                    {selectedStack?.map((tech: ITechnology) => (
                      <div className="selected-tag" key={tech.id}>
                        <TagComponent
                          name={tech.name}
                          color={tech.backgroundColor}
                        />
                      </div>
                    ))}
                  </div>
                </div>
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
                    data-testid="resetButton"
                    onClick={clearFields}
                  >
                    Reset
                  </button>
                  <button
                    className="orange-button"
                    data-testid="submitButton"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
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
