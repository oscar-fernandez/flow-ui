import { useEffect, useState, useRef } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";
import "./PodAssignment.css";
import * as Module from "../../Management/mgtUtils";
import IEnablee from "../../../models/interfaces/IEnablee";

const headers = [
  "Employee Id",
  "First Name",
  "Last Name",
  "Skills",
  "Enablement Start Date",
  "Enablement End Date",
];
const headerStyle = {
  minWidth: 50,
  background: "#E6E8E6",
  fontWeight: 700,
  fontSize: "24px",
  color: "#000048",
  borderRight: "1px solid #000048",
  "&:last-child": { borderRight: "none" },
};
const cellStyle = {
  fontSize: "18px",
  border: "none",
  color: "inherit",
};
const rowStyle = {
  border: "5px solid black",
  "&.MuiTableRow-root:hover": {
    cursor: "pointer",
    backgroundColor: "#DC8D0B",
    color: "#000048",
  },
};

export default function PodAssignment() {
  const selectedEnablees = useRef<number[]>([]);
  const [receivedEnablees, setReceivedEnablees] = useState<IEnablee[]>([]);

  useEffect(() => {
    getEnablees();
  }, []);

  const getEnablees = async () => {
    GetEnableesPendingPodAssignment()
      .then((res) => {
        setReceivedEnablees(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    //possible refac https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
  };

  //temp location
  const updateSelectedEnablees = (index: number) => {
    const e = receivedEnablees[index];
    const ar = selectedEnablees.current;
    if (!ar.includes(e.employeeId)) {
      ar.push(e.employeeId);
    } else {
      ar.splice(ar.indexOf(e.employeeId), 1);
    }
  };

  return (
    <div className="container">
      <PageViewHeader
        pageTitle="Assign Enablees to Pod"
        showPlus={false}
        isHeader={true}
        plusClicked={false}
      />
      <CustomTableContainer
        headers={headers}
        headerStyle={headerStyle}
        rows={Module.transformEnableeArray(receivedEnablees)}
        cellStyle={cellStyle}
        rowStyle={rowStyle}
        updateSelectedEnablees={updateSelectedEnablees}
        skill={false}
        value={""}
      />
      <div className="button-container">
        <button className="button button-orange">submit</button>
      </div>
    </div>
  );
}
