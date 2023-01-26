import { ChangeEvent, useState } from "react";
import "./PodTemplate.css";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import { MockRows, thing } from "../../data/MockData";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";
import IProject from "../../models/interfaces/IProject";
import { mockFePod } from "../../data/MockFEPod";
import { dumbProjects } from "../../data/MockProjects";

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
export default function PodTemplate(props: { showPodTemplate: boolean }) {
  // FEPod interface that is being created within this tempalte
  let pod: IFEPod;
  let projects: IProject[];

  // Closes the component when close is false, opens when close is true
  const [close, setClose] = useState(props.showPodTemplate);

  // If the pod name is empty then this value is false
  const [emptyPodName, setEmptyPodName] = useState(true);

  // State used to see for poject
  const [projectClicked, setProjectClicked] = useState(false);
  const [projectSelected, setProjectSelected] = useState("Empty");

  // State for project's tech stack
  const [projectTechStack, setProjectTechStack] = useState<ITechnology[]>([]);
  const [projectTechStackMargin, setProjectTechStackMargin] = useState("0px");

  // States used for creating the FEPod Object
  const [podName, setPodName] = useState("Untitled");
  const [enablees, setEnablees] = useState<IEnablee[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Open/Closes the PodTemplate component
  const closeModal = () => {
    setClose(!close);
  };

  // Checks if pod name input is empty helps manage disabling the submit button
  const checkPodName = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === null || event.target.value === "") {
      setEmptyPodName(true);
      setPodName("Untitled");
    } else {
      setEmptyPodName(false);
      setPodName(event.target.value);
      pod.podName = podName;
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
  function projectSelectedClicked(item: thing) {
    const techStackMargin = item.techStack.length * 24 - 32 + "px";
    setProjectTechStackMargin(techStackMargin);
    setProjectSelected(item.projectName);
    setProjectTechStack(item.techStack);

    // Will have to refactor hardcoded data
    pod.id = mockFePod.length + 1;
    pod.podStartDate = startDate?.toString();
    pod.podEndDate = endDate?.toString();
    pod.enabler = null;
    projects = dumbProjects;
    // pod.project = getProject(projectSelected)
    // retreiveEnablees(item);
  }

  // function getProject(projectName:string) {

  // }

  // function retreiveEnablees(item: thing) {}

  return (
    <>
      {close ? (
        <div className="container">
          <div className="margin-container">
            <div className="close-icon" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="none"
                className="close"
                height={32}
                width={32}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="content-section">
              {emptyPodName ? (
                <div className="div1">
                  <input
                    className="podname-input null"
                    type="text"
                    placeholder={podName}
                    onChange={(event) => checkPodName(event)}
                  />
                  <div className="errormsg">* Pod Name required</div>
                </div>
              ) : (
                <div className="div1">
                  <input
                    className="podname-input"
                    type="text"
                    placeholder="Untitled"
                    onChange={(event) => checkPodName(event)}
                  />
                </div>
              )}
              <div className="div2">
                <span className="numpods">0 / 15</span>
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
                <p className="empty">Empty</p>
              </div>

              <div className="div7">
                <p className="label">Project name</p>
              </div>
              <div className="div8">
                {projectClicked ? (
                  <div onClick={showProjects}>
                    <ul className="projects">
                      {MockRows.map((item, index) => (
                        <li
                          className="project-item"
                          onClick={() => projectSelectedClicked(item)}
                          key={index}
                        >
                          {item.projectName}
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
                    <button className="disabled btn-submit" disabled>
                      Submit
                    </button>
                  ) : (
                    <button className="btn-submit">Submit</button>
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
                <p className="empty project">Select Project</p>
                <div className="btn-container">
                  {emptyPodName ||
                  startDate === null ||
                  endDate === null ||
                  projectSelected === "Empty" ? (
                    <button className="disabled btn-submit" disabled>
                      Submit
                    </button>
                  ) : (
                    <button className="btn-submit">Submit</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
function createProjectObjectForPod(item: thing) {
  throw new Error("Function not implemented.");
}
