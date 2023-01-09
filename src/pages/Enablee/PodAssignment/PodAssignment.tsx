import { useEffect, useState, useRef, ChangeEvent } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";
import "./PodAssignment.css";
import * as Module from "../../Management/mgtUtils";
import * as Unit from "../../Pod/podUtils";
import IEnablee from "../../../models/interfaces/IEnablee";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { mockPods } from "../../../data/PodMock";
import IPod from "../../../models/interfaces/IPod";

const headersEnablee = [
  "Employee Id",
  "First Name",
  "Last Name",
  "Tech Stack",
  "Enablement Start Date",
  "Enablement End Date",
];

const headersPods = [
  "Project",
  "Pod Name",
  "Tech Stack",
  "Pod Start Date",
  "Pod End Date",
  "Capacity",
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
  const [receivedPods, setReceivedPods] = useState<IPod[]>([]);

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

  const [checked, setChecked] = useState([false, false]);

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const checkboxes = (
    <Box sx={{ display: "flex", flexDirection: "row", ml: 3 }}>
      <FormControlLabel
        label="Match Tech Stack"
        control={
          <Checkbox
            checked={checked[0]}
            onChange={handleChange1}
            sx={{
              color: "#dc8d0b",
            }}
          />
        }
      />
      <FormControlLabel
        label="Contains Tech Stack"
        control={
          <Checkbox
            checked={checked[1]}
            onChange={handleChange2}
            sx={{
              color: "#dc8d0b",
            }}
          />
        }
      />
    </Box>
  );

  return (
    <div className="container">
      <PageViewHeader pageTitle="Enablee" showPlus={true} />
      {checkboxes}
      <CustomTableContainer
        headers={headersEnablee}
        headerStyle={headerStyle}
        rows={Module.transformEnableeArray(receivedEnablees)}
        cellStyle={cellStyle}
        rowStyle={rowStyle}
        updateSelectedEnablees={updateSelectedEnablees}
        skill={false}
        value={""}
        toggleShowForm={() => {
          return null;
        }}
      />

      <div className="container"></div>
      <CustomTableContainer
        headers={headersPods}
        headerStyle={headerStyle}
        rows={Unit.transformPodArray(mockPods)}
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
