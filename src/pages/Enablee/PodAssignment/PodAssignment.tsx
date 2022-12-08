import TableComponent from "../../../components/Table/TableComponent/TableComponent";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import "./PodAssignment.css";
import { dummyEnablees } from "../../../data/EnableeMock";
import { useRef, useState } from "react";
import IEnablee from "../../../models/interfaces/IEnablee";
import IColumns from "../../../models/interfaces/IColumns";
import IEnableeTable from "../../../models/interfaces/IEnableeTable";

export default function PodAssignment() {
  const selectedEnablees = useRef([]);
  const [receivedEnablees, setRecivedEnablees] = useState(dummyEnablees);
  const enableeColumn: IColumns = {
    topics: [
      "id",
      "firstName",
      "lastName",
      "techStack",
      "enablementStartDate",
      "enablementEndDate",
    ],
  };

  const updatedEnablees = receivedEnablees.map((enablee: IEnablee) => {
    const updatedEnablee: IEnableeTable = {
      id: enablee.employeeId.toString(),
      firstName: enablee.firstName,
      lastName: enablee.lastName,
      techStack: enablee.technology,
      enablementStartDate: enablee.enablementStartDate.toDateString(),
      enablementEndDate: enablee.enablementEndDate.toDateString(),
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
