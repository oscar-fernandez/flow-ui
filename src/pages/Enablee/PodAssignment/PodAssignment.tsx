import TableComponent from "../../../components/Table/TableComponent/TableComponent";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { useEffect, useRef, useState } from "react";
import IEnablee from "../../../models/interfaces/IEnablee";
import IColumns from "../../../models/interfaces/IColumns";
import IEnableeTable from "../../../models/interfaces/IEnableeTable";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";
import "./PodAssignment.css";

export default function PodAssignment() {
  const selectedEnablees = useRef([]);
  const [receivedEnablees, setReceivedEnablees] = useState([]);

  useEffect(() => {
    getEnablees();
  }, []);

  const enableeColumns: IColumns = {
    topics: [
      "id",
      "firstName",
      "lastName",
      "techStack",
      "enablementStartDate",
      "enablementEndDate",
    ],
  };

  const getEnablees = async () => {
    GetEnableesPendingPodAssignment()
      .then((res) => {
        console.log(res);
        setReceivedEnablees(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatedEnablees = receivedEnablees.map((enablee: IEnablee) => {
    const updatedEnablee: IEnableeTable = {
      id: enablee.employeeId.toString(),
      firstName: enablee.firstName,
      lastName: enablee.lastName,
      techStack: enablee.technology,
      enablementStartDate: enablee.enablementStartDate,
      enablementEndDate: enablee.enablementEndDate,
    };
    return updatedEnablee;
  });

  return (
    <div className="container">
      <PageViewHeader pageTitle="Assign Enablees to Pod" showPlus={false} />
      <TableComponent
        selectedItems={selectedEnablees.current}
        columns={enableeColumns}
        rows={updatedEnablees}
      />
      <div className="button-container">
        <button className="button button-orange">submit</button>
      </div>
    </div>
  );
}
