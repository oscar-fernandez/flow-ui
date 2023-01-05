import { useState } from "react";
import "./PodTemplate.css";

export default function PodTemplate(props: { showPodTemplate: boolean }) {
  const [close, setClose] = useState(props.showPodTemplate);

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
                <span className="completion">0 / 15</span>
              </div>

              <div className="div3">
                <p className="label">Dates</p>
              </div>
              <div className="div4">
                <input className="input" type="text" placeholder="Empty" />
              </div>

              <div className="div5">
                <p className="label">Enabler(s)</p>
              </div>
              <div className="div6">
                <input className="input" type="text" placeholder="Empty" />
              </div>

              <div className="div7">
                <p className="label">Project name</p>
              </div>
              <div className="div8">
                <input className="input" type="text" placeholder="Empty" />
              </div>
              <div className="div9">
                <p className="label">Tech Stack</p>
              </div>

              <div className="div10">
                <input
                  className="input project"
                  type="text"
                  placeholder="Select Project"
                />
              </div>
            </div>

            <div>
              <h1 className="enablees header">
                Enablees <span className="plus">+</span>
              </h1>
              <input
                className="input project enablees"
                type="text"
                placeholder="Select Project"
              />
              <div className="btn-container">
                <button className="btn-submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
