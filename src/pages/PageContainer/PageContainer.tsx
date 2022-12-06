import "./PageContainer.css";
import {
  useToggle,
  useDetails,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import IEnablee from "../..//models/interfaces/IEnablee";
import Row from "../../components/RowComponent/Row";
import { useState } from "react";
import ToggleSidebar, {
  Action,
} from "../../components/ToggleSideBar/ToggleSidebar";
import React from "react";
import { width } from "@mui/system";

function PageContainer() {
  const [toggle, changeToggle] = useToggle();
  //  const { toggle, changeToggle } = React.useToggle()
  const [details, changeDetails] = useDetails();
  const [index, setIndex] = useState(0);

  const dummyEnablees: IEnablee[] = [
    {
      employeeId: 977284,
      firstName: "Steve",
      lastName: "Bob",
      dateOfJoin: new Date(),
      enablementStartDate: new Date(),
      enablementEndDate: new Date(),
      assetTag: "I Don't know",
      isEmployed: false,
      technology: [
        { id: 2, name: "Java" },
        { id: 8, name: "React" },
        { id: 12, name: "Rust" },
        { id: 12, name: "C++" },
      ],
      countryCode: 1,
      gradeId: 1,
      communityId: 1,
      employementTypeId: 1,
      podId: 1,
      commentId: [1, 2, 3],
    },
    {
      employeeId: 1221,
      firstName: "Jessabelle",
      lastName: "Cowringer",
      dateOfJoin: new Date(),
      enablementStartDate: new Date(),
      enablementEndDate: new Date(),
      assetTag: "I Don't know",
      isEmployed: false,
      technology: [
        { id: 2, name: "Java" },
        { id: 8, name: "React" },
      ],
      countryCode: 1,
      gradeId: 1,
      communityId: 1,
      employementTypeId: 1,
      podId: 1,
      commentId: [1, 2, 3],
    },
    {
      employeeId: 23580,
      firstName: "Mary",
      lastName: "Somerville",
      dateOfJoin: new Date(),
      enablementStartDate: new Date(),
      enablementEndDate: new Date(),
      assetTag: "I Don't know",
      isEmployed: true,
      technology: [
        { id: 2, name: "Java" },
        { id: 12, name: "Python" },
        { id: 8, name: "React" },
        { id: 15, name: "MATLabs" },
      ],
      countryCode: 40,
      gradeId: 0,
      communityId: 32,
      employementTypeId: 64,
      podId: 3,
      commentId: [1, 2, 3],
    },
  ];

  return (
    <div className="page-container">
      <div>Menu-side-bar</div>

      <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
        {dummyEnablees.map((enablee, i) => {
          return (
            <Row
              id={enablee.employeeId}
              firstName={enablee.firstName}
              lastName={enablee.lastName}
              techStack={enablee.technology.map((tech) => tech.name)}
              key={i}
              onClick={() => {
                changeToggle();
                changeDetails(enablee);
              }}
            />
          );
        })}
      </div>
      <ToggleSidebar
        toggle={toggle}
        setToggle={() => {
          changeToggle();
        }}
        details={details}
        action={index === 0 ? Action.VIEW : Action.EDIT}
      />
    </div>
  );
}

export default PageContainer;
