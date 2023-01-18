import { useEffect, useState } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import { GetPaginatedEnablees } from "../../services/EnableeAPI";
import Row from "../RowComponent/Row";

export function GenerateRows() {
  const [ontoggle, setToggle] = useState(false);
  const [enablees, setEnablees] = useState<IEnablee[]>([]);

  useEffect(() => {
    getEnablees(0);
  }, []);

  const getEnablees = async (pageNumber: number) => {
    GetPaginatedEnablees(pageNumber)
      .then((res) => {
        setEnablees(res.data.items);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      {enablees.map((enablee, i) => {
        return (
          <Row
            key={i}
            id={enablee.employeeId}
            firstName={enablee.firstName}
            lastName={enablee.lastName}
            techStack={enablee.technology}
            onClick={() => {
              setToggle(!ontoggle);
            }}
          />
        );
      })}
    </>
  );
}
