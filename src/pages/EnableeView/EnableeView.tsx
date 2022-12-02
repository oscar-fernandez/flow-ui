import { Filter } from "../../components/Filter/Filter";
import "./EnableeView.css";
import { useState } from "react";
import PageNumberCarousel from "../../components/PageNumberCarousel/PageNumberCarousel";
import Row from "../../components/RowComponent/Row";
import { dummyEnablees } from "../../utils/EnableeMock";
import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { LoginComponent } from "../../components/HeaderSectionComponents/LoginComponent/LoginComponent";

export function EnableeView() {
  const [ontoggle, setToggle] = useState(false);

  return (
    <>
      <LoginComponent name="Ondrew" />

      <PageViewHeader pageTitle="Enablees" showPlus={true} />

      <Filter
        inputOne="employee id"
        inputTwo="first name"
        inputThree="last name"
        inputFour="tech stack"
      />

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

      <PageNumberCarousel totalPages={10} />
    </>
  );
}
