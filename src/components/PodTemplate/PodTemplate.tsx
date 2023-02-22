import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./PodTemplate.css";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";
import IEnablee from "../../models/interfaces/IEnablee";
import IProject from "../../models/interfaces/IProject";
import { isEnableeValidForPod } from "../../utils/utilityFunctions";
import { getProjects } from "../../services/ManagementAPI";
import { GetEnableesPendingPodAssignment } from "../../services/EnableeAPI";
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
  const podCapacity = 15;
  const selectedEnablees = useRef<IEnablee[]>([]);
  // Closes the component when close is false, opens when close is true
  // If the pod name is empty then this value is false
  const [emptyPodName, setEmptyPodName] = useState(true);

  // State used to see for project
  const [showProjectList, setShowProjectList] = useState(false);
  // const [projectSelected, setProjectSelected] = useState('Empty');
  const [selectedProjectString, setSelectedProjectString] =
    useState<string>("Empty");
  const [selectedProject, setSelectedProject] = useState<any>();
  // State for project's tech stack
  const [projectTechStack, setProjectTechStack] = useState<ITechnology[]>([]);
  const [projectTechStackMargin, setProjectTechStackMargin] = useState("0px");

  // States used for creating the FEPod Object
  const [pod, setPod] = useToggleDetail();

  const [podId, setPodId] = useState("");
  const [podName, setPodName] = useState("");
  const [enablees, setEnablees] = useState<IEnablee[]>([]);
  const [podEnablees, setPodEnablees] = useState<IEnablee[]>([]);
  const [enablers, setEnablers] = useState<IEnabler[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Need to connect this with projects backend API
  const [allProjects, setAllProjects] = useState<IProject[]>([]);

  // State used to update Pod Capacity
  const [numEnablees, setNumEnablees] = useState(15);
  const [checkBoxList, setCheckBoxList] = useState<boolean[]>([]);
  const [checkBoxesDisabled, setCheckBoxesDisabled] = useState(false);

  // Context used for ToggleSideBar
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();
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
  function toggleShowProjectList() {
    setShowProjectList(!showProjectList);
  }

  /**
   * This function sets the project's states when the user selects it.
   * @param item project selected by user
   */
  function handleProjectSelection(item: IProject) {
    const techStackMargin = item.technology.length * 24 - 32 + "px";
    setProjectTechStackMargin(techStackMargin);
    setProjectTechStack(item.technology);
    setSelectedProjectString(item.name);
    setSelectedProject(item);
    toggleShowProjectList();
  }

  const handleSubmit = () => {
    if (pod == null) {
      const tempPod: IFEPod = {
        id: 0,
        podName: podName,
        enablee: selectedEnablees.current,
        enabler: enablers,
        podStartDate: startDate?.toISOString().split("T")[0] || "",
        podEndDate: endDate?.toISOString().split("T")[0] || "",
        project: selectedProject,
      };
      postPod(tempPod);
    } else if (isPod(pod)) {
      const tempPod: IFEPod = { ...pod };
      tempPod.enablee = selectedEnablees.current;
      tempPod.enabler = enablers;
      tempPod.podName = podName;
      tempPod.podStartDate = startDate?.toISOString().split("T")[0] || "";
      tempPod.podEndDate = endDate?.toISOString().split("T")[0] || "";
      tempPod.project = selectedProject;
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
    if (startDate && endDate) {
      let retrievedEnablees: IEnablee[] = [];
      GetEnableesPendingPodAssignment().then((res) => {
        retrievedEnablees = res.data;
        retrievedEnablees = retrievedEnablees.filter((enablee) =>
          isEnableeValidForPod(
            startDate.toString(),
            endDate.toString(),
            enablee.enablementStartDate,
            enablee.enablementEndDate
          )
        );
        setEnablees([...podEnablees, ...retrievedEnablees]);
      });
    }
  }

  /**
   * API call to retrieve list of Projects
   */
  const getListOfProjects = async () => {
    getProjects()
      .then((res: any) => {
        setAllProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Update list of checkbox "checked" state
   */
  function handleCheckBoxClick(checkBoxIdx: number) {
    let updatedCheckedState: boolean[];
    if (numEnablees === podCapacity) {
      updatedCheckedState = checkBoxList.map((checkBox, index) =>
        index === checkBoxIdx && checkBox ? !checkBox : checkBox
      );
    } else {
      updatedCheckedState = checkBoxList.map((checkBox, index) =>
        index === checkBoxIdx ? !checkBox : checkBox
      );
    }
    selectedEnablees.current = [];
    updatedCheckedState.map((checked, index) => {
      checked ? selectedEnablees.current.push(enablees[index]) : null;
    });
    setCheckBoxList(updatedCheckedState);
  }

  const handleCheckedCount = () => {
    let num = 0;
    checkBoxList.forEach((item) => {
      if (item === true) {
        num++;
      }
    });
    setNumEnablees(num);
    if (num === podCapacity) {
      setCheckBoxesDisabled(true);
    } else {
      setCheckBoxesDisabled(false);
    }
  };

  /**
   * Prepopulates the pod template with pod information
   * passed into it through the context IFEPod object.
   */
  useEffect(() => {
    getListOfProjects();
    if (pod && isPod(pod)) {
      setPodId(pod.id.toString());
      setPodName(pod.podName);
      setEmptyPodName(false);
      setPodEnablees(pod.enablee);
      setEnablers(pod.enabler);
      setStartDate(new Date(pod.podStartDate));
      setEndDate(new Date(pod.podEndDate));
      setSelectedProjectString(pod.project.name);
      setProjectTechStack(pod.project.technology);
      setSelectedProjectString(pod.project.name);
      setSelectedProject(pod.project);
    }
  }, [pod]);

  useEffect(() => {
    if (startDate && endDate) {
      retrieveEnablees();
    }
  }, [startDate, endDate]);

  /**
   * Helps update the capacity of the pod.
   */
  useEffect(() => {
    const newCheckBoxList: boolean[] = new Array(enablees.length).fill(false);
    newCheckBoxList.fill(true, 0, podEnablees.length);
    setCheckBoxList(newCheckBoxList);
  }, [enablees]);

  useEffect(() => {
    handleCheckedCount();
  }, [checkBoxList]);

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
            {/* Projects */}
            <div className="div8">
              {!showProjectList ? (
                <div data-testid="projects">
                  <p
                    className={
                      selectedProjectString !== "Empty"
                        ? "project-selected"
                        : "empty null project"
                    }
                    onClick={toggleShowProjectList}
                    data-testid="projectsBtn"
                  >
                    {selectedProjectString}
                  </p>
                </div>
              ) : (
                <div data-testid="projects">
                  <ul className="projects">
                    {allProjects.map((project, index) => (
                      <li
                        className="project-item"
                        onClick={() => handleProjectSelection(project)}
                        key={index}
                      >
                        {project.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Tech Stack */}
            <div className="div9">
              <p className="label">Tech Stack</p>
            </div>
            <div className="div10">
              {selectedProjectString === "Empty" ? (
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
          {/* Enablees */}
          {selectedProjectString === "Empty" ? (
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
                selectedProjectString === "Empty" ? (
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
                    <li className="enablees-enablee" key={enablee.employeeId}>
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
                            //should be disabled if state checkBoxesDisabled is true and this box is not checked
                            disabled={
                              checkBoxesDisabled && !checkBoxList[index]
                            }
                            checked={checkBoxList[index]}
                            onChange={() => handleCheckBoxClick(index)}
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
                <div className="button-center">
                  <Button
                    disabled={
                      emptyPodName ||
                      startDate === null ||
                      endDate === null ||
                      selectedProjectString === "Empty"
                        ? true
                        : false
                    }
                    variant="contained"
                    sx={buttonStyle}
                    data-testid="podActiveSubmitButton"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
