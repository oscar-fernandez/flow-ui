import TableComponent from "../../components/Table/TableComponent";
import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import "./PodAssignment.css";
import { dummyEnablees } from "../../data/EnableeMock";
import { useEffect, useRef, useState } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import ITechnology from "../../models/interfaces/ITechnology";
import IColumns from "../../models/interfaces/IColumns";

interface IEnableeTable {
  id: string;
  firstName: string;
  lastName: string;
  techStack: string;
  // enablementStartDate: Date;
  // enablementEndDate: Date;
}

export default function PodAssignment() {
  const selectedEnablees = useRef([]);
  const [receivedEnablees, setRecivedEnablees] = useState(dummyEnablees);
  const enableeColumn: IColumns = {
    topics: [
      "id",
      "firstName",
      "lastName",
      "techStack",
      // 'enablementStartDate',
      // 'enablementEndDate',
    ],
  };

  // useEffect(() => {}, [receivedEnablees]);

  // let changedEnablees = recivedEnablees;
  const updatedEnablees = receivedEnablees.map((enablee: IEnablee) => {
    let techList = "";
    enablee.technology.forEach((tech: ITechnology, idx) => {
      enablee.technology.length - 1 === idx
        ? (techList += tech.name)
        : (techList += `${tech.name}, `);
    });
    const updatedEnablee: IEnableeTable = {
      id: enablee.employeeId.toString(),
      firstName: enablee.firstName,
      lastName: enablee.lastName,
      techStack: techList,
      // enablementStartDate: enablee.enablementStartDate,
      // enablementEndDate: enablee.enablementEndDate,
    };
    return updatedEnablee;
  });

  return (
    <div className="container">
      <PageViewHeader pageTitle="Assign Enablees to Pod" showPlus={false} />
      <TableComponent
        selectedItems={selectedEnablees.current}
        columns={enableeColumn}
        rows={updatedEnablees}
      />
      <div className="button-container">
        <button className="button button-orange">submit</button>
      </div>
    </div>
  );
}
