import { useState } from "react";
import "./PodTemplate.css";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";

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
  // Closes the component when close is false, opens when close is true
  const [close, setClose] = useState(props.showPodTemplate);

  // The 3 states below keep track of whether the user has selected them
  const [emptyPodName, setEmptyPodName] = useState(true);
  const [emptyDates, setEmptyDates] = useState(true);
  const [emptyProjectName, setEmptyProjectName] = useState(true);

  // Open/Closes the PodTemplate component
  const closeModal = () => {
    setClose(!close);
  };

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
              <div className="div1">
                <input
                  className="podname-input"
                  type="text"
                  placeholder="Untitled"
                />
              </div>
              <div className="div2">
                <span className="numpods">0 / 15</span>
              </div>

              <div className="div3">
                <p className="label">Dates</p>
              </div>
              <div className="div4">
                <p className="empty">Empty</p>
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
                <p className="empty">Empty</p>
              </div>
              <div className="div9">
                <p className="label">Tech Stack</p>
              </div>

              <div className="div10">
                <p className="empty project">Select Project</p>
              </div>
            </div>

            <PageViewHeader
              pageTitle={"Enablees"}
              showPlus={true}
              isHeader={false}
              plusClicked={false}
            />
            <p className="empty project">Select Project</p>
            <div className="btn-container">
              <button className="btn-submit">Submit</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
