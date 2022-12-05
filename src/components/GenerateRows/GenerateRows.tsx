import { useState } from "react";
import { dummyEnablees } from "../../data/EnableeMock";
import Row from "../RowComponent/Row";

export function GenerateRows() {
  const [ontoggle, setToggle] = useState(false);

  return (
    <>
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
    </>
  );
}
