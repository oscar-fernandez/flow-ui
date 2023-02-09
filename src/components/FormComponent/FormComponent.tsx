import { MenuItem, MenuList, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ITechnology from "../../models/interfaces/ITechnology";
import IProject from "../../models/interfaces/IProject";
import {
  updateProject,
  createProject,
  getTechnologies,
} from "../../services/ManagementAPI";
import { TagComponent } from "../TagComponent/Tag";

import "./FormComponent.css";

const InputProps = {
  disableUnderline: true,
};

export default function FormComponent(props: any) {
  const inputProps = {
    style: {
      padding: 0,
      fontSize: "15px",
      fontWeight: 600,
      //color: "rgba(138, 139, 138, 0.4)",
      color: "rgba(120, 139, 138, 0.6)",
    },
    readOnly: props.readonly,
  };

  const [techStack, setTechStack] = useState(props.allTechnologies);
  const [selectedStack, setSelectedStack] = useState(props.technologies);
  const [projectName, setProjectName] =
    useState(props.selectedRow?.current?.name) || null;
  const [projectLink, setProjectLink] =
    useState(props.selectedRow?.current?.repoLink) || null;
  const [projectDescription, setProjectDescription] =
    useState(props.selectedRow?.current?.description) || null;

  // function to reset form values to origonal values
  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProjectName(props.selectedRow?.current?.name);
    setProjectLink(props.selectedRow?.current?.repoLink);
    setProjectDescription(props.selectedRow?.current?.description);
    setSelectedStack(props.technologies);
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

    techArr = selectedStack;

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
                value={projectName || ""}
                // data-testid="pName"
                id="projectName"
                name="projectName"
                inputProps={{
                  ...inputProps,
                  maxLength: 255,
                  pattern: "^[a-zA-Z0-9_-]*$",
                  "data-testid": "pName",
                }}
                InputProps={InputProps}
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                onChange={(e) => setProjectName(e.target.value)}
                error={
                  projectName === undefined || projectName?.trim().length === 0
                }
                helperText={
                  projectName === undefined ||
                  projectName?.trim().length === 0 ? (
                    <p className="Invalid_msg">* Invalid Project Name</p>
                  ) : (
                    " "
                  )
                }
              />
            </div>
            <div className="form-wrap">
              <label className="p-label">
                Link to Project
                <br /> Repository
              </label>
              <TextField
                className="form-field"
                // data-testid="pLink"
                id="link"
                name="link"
                inputProps={{
                  ...inputProps,
                  pattern:
                    "^(https://git.work.cognizant.studio/enablement/team-projects/\\S+)",
                  "data-testid": "pLink",
                }}
                InputProps={InputProps}
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                value={projectLink || ""}
                onChange={(e) => setProjectLink(e.target.value)}
                error={
                  !projectLink?.match(
                    "^(https://git.work.cognizant.studio/enablement/team-projects/\\S+)"
                  )
                }
                helperText={
                  !projectLink?.match(
                    "^(https://git.work.cognizant.studio/enablement/team-projects/\\S+)"
                  ) ? (
                    <p className="Invalid_msg">* Invalid Project Link</p>
                  ) : (
                    " "
                  )
                }
              />
            </div>
            <div className="form-wrap">
              <label className="p-label">Project Summary</label>
              <TextField
                className="form-field"
                // data-testid="pDesc"
                id="summary"
                name="summary"
                multiline
                rows={4}
                inputProps={{
                  ...inputProps,
                  "data-testid": "pDesc",
                }}
                InputProps={InputProps}
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                onChange={(e) => setProjectDescription(e.target.value)}
                value={projectDescription || ""}
                error={
                  projectDescription === null ||
                  projectDescription?.length > 100
                }
                helperText={
                  projectDescription?.length > 100 ? (
                    <p className="maxCharater">* Max Character Limit Reached</p>
                  ) : (
                    " "
                  )
                }
              />
            </div>
          </div>
          <div className="column-r">
            <div className="tech-wrap">
              <label className="te-label">Technologies</label>
              {selectedStack && (
                <>
                  <div className="stack-error" data-testid={"teckStackError"}>
                    {techStack?.map((tech: ITechnology) => (
                      <MenuItem
                        key={tech.id}
                        className="tech-item"
                        data-testid={tech.name}
                        disabled={props.edit}
                        onClick={() => {
                          handleTechStack(tech);
                        }}
                      >
                        {tech.name}
                      </MenuItem>
                    ))}
                  </div>
                </>
              )}
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
                <>
                  <p className="customErrorMessage">
                    {" "}
                    * Must Select A Technology{" "}
                  </p>
                  <p className="tn-label">Current Tech Stack: None</p>
                </>
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
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  <button
                    className="orange-button"
                    data-testid="submitButton"
                    onClick={handleSubmit}
                    disabled={
                      projectName === undefined ||
                      projectName?.trim().length === 0 ||
                      !projectLink?.match(
                        "^(https://git.work.cognizant.studio/enablement/team-projects/\\S+)"
                      ) ||
                      selectedStack.length === 0 ||
                      projectDescription.length >= 100
                    }
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <button className="blue-button" onClick={props.handleClick}>
                    Back to Projects...
                  </button>
                  <button
                    className="orange-button"
                    data-testid="editBtn"
                    onClick={props.handleEdit}
                  >
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
