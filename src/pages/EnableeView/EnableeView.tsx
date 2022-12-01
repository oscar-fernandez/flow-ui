import { Filter } from "../../components/Filter/Filter";
import "./EnableeView.css";
import { useState } from "react";
import PageNumberCarousel from "../../components/PageNumberCarousel/PageNumberCarousel";
import Row from "../../components/RowComponent/Row";
import { dummyEnablees } from "./EnableeMock";

export function EnableeView() {
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(1);

  return (
    <>
      <Filter
        inputOne="employee id"
        inputTwo="first name"
        inputThree="last name"
        inputFour="tech stack"
      />
      <p>hi</p>
      {dummyEnablees.map((enablee, i) => {
        <Row
          id={enablee.employeeId}
          firstName={enablee.firstName}
          lastName={enablee.lastName}
          techStack={["Java", "React", "Rust", "C++"]}
          key={i}
          onClick={() => {
            setToggle(!ontoggle);
            setIndex(i);
          }}
        />;
      })}
      <PageNumberCarousel totalPages={10} />
    </>
  );
}
