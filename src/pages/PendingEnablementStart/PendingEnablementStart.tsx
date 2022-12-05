import { Filter } from "../../components/Filter/Filter";
import "./PendingEnablementStart.css";
import { useState } from "react";

import Row from "../../components/RowComponent/Row";
import { dummyEnablees } from "../../utils/EnableeMock";

import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { LoginComponent } from "../../components/HeaderSectionComponents/LoginComponent/LoginComponent";

export function PendingEnablement() {
  const [ontoggle, setToggle] = useState(false);

  return (
    <>
      <LoginComponent name="ondrew" />
      <div className="page-section">
        <PageViewHeader pageTitle="Pending Enablement Start" showPlus={false} />
        <div className="filter-container">
          <Filter
            inputOne="employee id"
            inputTwo="first name"
            inputThree="last name"
            inputFour="tech stack"
          />
        </div>

        {dummyEnablees.map((enablee, i) => {
          return (
            <Row
              key={i}
              id={enablee.employeeId}
              firstName={enablee.firstName}
              lastName={enablee.lastName}
              techStack={["Java", "React", "Rust", "C++"]}
              onClick={() => {
                setToggle(!ontoggle);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
