import { ChangeEvent, useEffect, useState } from "react";
import "./PodTemplate.css";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";
import IEnablee from "../../models/interfaces/IEnablee";
import IProject from "../../models/interfaces/IProject";
import { dumbProjects } from "../../data/MockProjects";
import { isEnableeValidForPod } from "../../utils/utilityFunctions";
import { dummyEnablees } from "../../data/EnableeMock";
import {
  useToggle,
  useToggleDetail,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEPod from "../../models/interfaces/IFEPod";
import IEnabler from "../../models/interfaces/IEnabler";
import { useLocation, useNavigate } from "react-router";
import { createPod, updatePod } from "../../services/PodAPI";
import { Button } from "@mui/material";

const buttonStyle = {
  backgroundColor: "#DC8D0B",
  fontFamily: "Darker Grotesque",
  fontWeight: 700,
  fontSize: "15px",
  letterSpacing: "0.025em",
  padding: ".3rem 1.25rem",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "5px",
  "&:hover": {
    color: "##F8E8CE",
    backgroundColor: "#DC8D0B",
    boxShadow: "none",
  },
  "&:disabled": {
    backgroundColor: "rgba(220, 141, 11, 0.5)",
    color: "#F8E8CE",
  },
};

/**
 * Functional component that is a side modal to help the user manage
 * different pods. The user will be able to pick and see the pod's begin
 * and end date, the user will be able to choose the enabler(s) for the pod,
 * the user will be able to choose a project, the user will be able to see
 * the tech stack with color coordination, the user will be able to see the
 * enablees within the project.
 *
 * @param props boolean TRUE to open component, FALSE to close component
 * @returns the Pod Component
 */
export default function PodTemplate() {
  // Closes the component when close is false, opens when close is true

  // If the pod name is empty then this value is false
  const [emptyPodName, setEmptyPodName] = useState(true);

  // State used to see for poject
  const [projectClicked, setProjectClicked] = useState(false);
  const [projectSelected, setProjectSelected] = useState("Empty");

  // State for project's tech stack
  const [projectTechStack, setProjectTechStack] = useState<ITechnology[]>([]);
  const [projectTechStackMargin, setProjectTechStackMargin] = useState("0px");

  // States used for creating the FEPod Object
  const [pod, setPod] = useToggleDetail();

  const [podId, setPodId] = useState("");
  const [podName, setPodName] = useState("");
  const [enablees, setEnablees] = useState<IEnablee[]>([]);
  const [enablers, setEnablers] = useState<IEnabler[] | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // Need to connect this with projects backend API
  const [podProject, setPodProject] = useState(dumbProjects);

  // State used to update Pod Capacity
  const [numEnablees, setNumEnablees] = useState(0);
  const [enableeCheckbox, setEnableeCheckbox] = useState(
    new Array(15).fill(false)
  );

  // Context used for ToggleSideBar
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();
  const [selectedPodProject, setSelectedPodProject] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  /**
   * Helper function for the useEffect to check if the object
   * passed into the context is actually an IFEPod.
   * @param object
   * @returns object
   */
  function isPod(object: any): object is IFEPod {
    return "podStartDate" in object;
  }

  /**
   * Prepopulates the pod template with pod information
   * passed into it through the context IFEPod object.
   */
  useEffect(() => {
    if (pod && isPod(pod)) {
      setPodId(pod.id.toString());
      setPodName(pod.podName);
      setEmptyPodName(false);
      setEnablees(pod.enablee);
      setEnablers(pod.enabler);
      setStartDate(new Date(pod.podStartDate));
      setEndDate(new Date(pod.podEndDate));
      setSelectedPodProject(pod.project);
    }
  }, [pod]);

  // Checks if pod name input is empty helps manage disabling the submit button
  const checkPodName = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === null || event.target.value === "") {
      setEmptyPodName(true);
      setPodName(event.target.value);
    } else {
      setEmptyPodName(false);
      setPodName(event.target.value);
    }
  };

  /**
   * This function will open up a dropdown menu for the user to select projects from
   * by managing  the state of the variable listed below.
   */
  function showProjects() {
    setProjectClicked(!projectClicked);
  }

  /**
   * This function sets the project's states when the user selects it.
   * @param item project selected by user
   */
  function projectSelectedClicked(item: IProject) {
    const techStackMargin = item.technology.length * 24 - 32 + "px";
    setProjectTechStackMargin(techStackMargin);
    setEnablees([]);
    setProjectSelected(item.name);
    setProjectTechStack(item.technology);
    retrieveEnablees();
    setSelectedPodProject(item);
  }

  const handleSubmit = () => {
    if (pod == null) {
      const tempPod: IFEPod = {
        id: 0,
        podName: podName,
        enablee: enablees,
        enabler: enablers,
        podStartDate: startDate?.toDateString() || "",
        podEndDate: endDate?.toDateString() || "",
        project: selectedPodProject,
      };
      postPod(tempPod);
    } else if (isPod(pod)) {
      const tempPod: IFEPod = { ...pod };
      tempPod.enablee = enablees;
      tempPod.enabler = enablers;
      tempPod.podName = podName;
      tempPod.podStartDate = startDate?.toDateString() || "";
      tempPod.podEndDate = endDate?.toDateString() || "";
      tempPod.project = selectedPodProject;
      putPod(tempPod);
    }
  };

  const postPod = (pod: IFEPod) => {
    createPod(pod)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setPod(res.data);
          changeToggle();
          navigate(location);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const putPod = (pod: IFEPod) => {
    updatePod(pod)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setPod(res.data);
          changeToggle();
          navigate(location);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   * Helper function to display all enablees that are valid
   * for the pod given the start and end date for pod and
   * enablee.
   */
  function retrieveEnablees() {
    let result: IEnablee[] = [];
    if (startDate && endDate) {
      result = dummyEnablees.filter((enablee) => {
        if (
          enablee.enablementEndDate != null &&
          enablee.enablementStartDate != null
        ) {
          isEnableeValidForPod(
            startDate.toString(),
            endDate.toString(),
            enablee.enablementStartDate,
            enablee.enablementEndDate
          );
        }
      });
      setEnablees(result);
    }
  }

  /**
   * Function updated everytime the user selects a checkbox.
   * @param pos index position
   */
  function addEnableeToPod(pos: number) {
    const updatedCheckedState = enableeCheckbox.map((item, index) =>
      index === pos ? !item : item
    );
    setEnableeCheckbox(updatedCheckedState);
  }

  /**
   * Helps update the capacity of the pod.
   */
  useEffect(() => {
    let num = 0;

    enableeCheckbox.forEach((item) => {
      if (item === true) {
        num++;
      }
    });
    setNumEnablees(num);
  }, [enableeCheckbox]);

  return (
    <>
      <div className="container">
        <div className="margin-container">
          <div className="content-section">
            {emptyPodName && podName.length === 0 ? (
              <div className="div1">
                <input
                  className="podname-input null"
                  data-testid="podName"
                  type="text"
                  placeholder="Untitled"
                  onChange={(event) => checkPodName(event)}
                />
                <div className="errormsg">* Pod Name required</div>
              </div>
            ) : (
              <div className="div1">
                <input
                  data-testid="podName"
                  className="podname-input"
                  type="text"
                  placeholder="Untitled"
                  value={podName}
                  onChange={(event) => checkPodName(event)}
                />
              </div>
            )}
            <div className="div2">
              <span className="numpods">{numEnablees} / 15</span>
            </div>

            <div className="div3">
              <p className="label">Dates</p>
            </div>
            <div className="div4">
              <div>
                {startDate === null && endDate === null ? (
                  <div className="empty null">
                    <DatepickerComponent
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                    />
                    <div className="errormsg dates">* Pod Dates required</div>
                  </div>
                ) : (
                  <DatepickerComponent
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                )}
              </div>
            </div>

            <div className="div5">
              <p className="label">Enabler(s)</p>
            </div>
            <div className="div6">
              {enablers ? (
                <div className="enablers-container">
                  <ul className="enablers-list">
                    {enablers?.map((enabler, index) => (
                      <li className="enabler-item" key={index}>
                        {enabler.firstName} {enabler.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="empty">Empty</div>
              )}
            </div>

            <div className="div7">
              <p className="label">Project name</p>
            </div>
            <div className="div8">
              {projectClicked ? (
                <div onClick={showProjects} data-testid="projects">
                  <ul className="projects">
                    {dumbProjects.map((item, index) => (
                      <li
                        className="project-item"
                        onClick={() => projectSelectedClicked(item)}
                        key={index}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  {projectSelected === "Empty" ? (
                    <>
                      <p
                        className="empty null project"
                        onClick={showProjects}
                        data-testid="projectsBtn"
                      >
                        {projectSelected}
                      </p>
                      <div className="errormsg">* Project Name required</div>
                    </>
                  ) : (
                    <>
                      <p className="project-selected" onClick={showProjects}>
                        {projectSelected}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="div9">
              <p className="label">Tech Stack</p>
            </div>

            <div className="div10">
              {projectSelected === "Empty" ? (
                <p className="empty project">Select Project</p>
              ) : (
                <div className="techstack-container">
                  <ul className="techstack-list">
                    {projectTechStack.map((item, index) => (
                      <li className="techstack-item" key={index}>
                        <TagComponent
                          name={item.name}
                          color={item.backgroundColor}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {projectSelected === "Empty" ? (
            <div>
              <PageViewHeader
                pageTitle={"Enablees"}
                showPlus={true}
                isHeader={false}
                plusClicked={false}
              />
              <p className="empty project">Select Project</p>
              <div className="btn-container">
                {emptyPodName ||
                startDate === null ||
                endDate === null ||
                projectSelected === "Empty" ? (
                  <div className="button-center">
                    <Button
                      disabled={true}
                      variant="contained"
                      sx={buttonStyle}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="button-center">
                    <Button
                      disabled={false}
                      variant="contained"
                      sx={buttonStyle}
                      data-testid="podActiveSubmitButton"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: projectTechStackMargin }}>
              <PageViewHeader
                pageTitle={"Enablees"}
                showPlus={true}
                isHeader={false}
                plusClicked={false}
              />
              <div className="enablees-container">
                <ul className="enablees-list" data-testid="enablee">
                  {enablees.map((enablee, index) => (
                    <li className="enablees-enablee" key={index}>
                      <div className="enablee-item-container">
                        <a
                          className="enablee-item"
                          data-testid={enablee.firstName}
                          onClick={() => {
                            changeToggle();
                            setDetails(enablee);
                          }}
                        >
                          {enablee.firstName} {enablee.lastName}
                        </a>

                        <span className="enablee-checkbox-container">
                          <input
                            className="enablee-checkbox"
                            data-testid="enableeCheckbox"
                            type="checkbox"
                            onChange={() => addEnableeToPod(index)}
                          />
                          <span className="enablee-techstack-container">
                            {enablee.technology.map((tech, index) => (
                              <span
                                key={index}
                                className="enablee-tech"
                                style={{
                                  backgroundColor: tech.backgroundColor,
                                }}
                              ></span>
                            ))}
                          </span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="btn-container">
                {emptyPodName ||
                startDate === null ||
                endDate === null ||
                projectSelected === "Empty" ? (
                  <div className="button-center">
                    <Button
                      disabled={true}
                      variant="contained"
                      sx={buttonStyle}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="button-center">
                    <Button
                      disabled={false}
                      variant="contained"
                      sx={buttonStyle}
                      data-testid="podActiveSubmitButton"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
