import { useEffect, useState, useRef, ChangeEvent } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";
import "./PodAssignment.css";
import * as Module from "../../Management/mgtUtils";
import * as Unit from "../../Pod/podUtils";
import IEnablee from "../../../models/interfaces/IEnablee";
import { Box, Checkbox, FormControlLabel, SxProps, Theme } from "@mui/material";
import { mockPods } from "../../../data/PodMock";
import IPod from "../../../models/interfaces/IPod";
import { dummyEnablees } from "../../../data/EnableeMock";
import usePendingPodEnablees, { getEnablees } from "../Hooks/customHook";
import { f } from "vitest/dist/index-2f5b6168";

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

interface Props {
  headers: string[];
  headerStyle?: SxProps<Theme>;
  rows: string[][];
  rowStyle: SxProps<Theme>;
  cellStyle: SxProps<Theme>;
  customHandleSelection?: () => void;
  updateSelectedEnablees?: (index: number) => void;
  checkboxId: number;
  label?: string;
}

export default function PodAssignment() {
  const selectedEnablees = useRef<number[]>([]);
  const [receivedEnablees, setReceivedEnablees] = useState<IEnablee[]>([]);
  const [receivedPods, setReceivedPods] = useState<IPod[]>([]);
  const [value, setValue] = useState([]);
  const [name, setName] = useState("");
  const selectedRow = useRef({});
  const [selectPod, setSelectPod] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [activTable, setActivTable] = useState(false);

  useEffect(() => {
    getEnablees();
    fn();
  }, [receivedEnablees, dummyEnablees]);

  const getEnablees = async () => {
    GetEnableesPendingPodAssignment()
      .then((res) => res.data)
      .then((receivedEnablees) => setReceivedEnablees(receivedEnablees));
    //possible refac https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
  };

  // useEffect(() => {
  //   //let isDisabled = disabled ? true : false;
  //   const isActivTable = activTable ? dummyEnablees : null;

  // },[ dummyEnablees]);

  function fn(): IEnablee[] {
    switch (name) {
      case "Match Tech Stack":
        return Unit.matchAllSkills(dummyEnablees, mockPods[0]);
      case "Contains Tech Stack":
        return Unit.matchSomeSkills(dummyEnablees, mockPods[0]);
      default:
        return receivedEnablees;
    }
  }

  const customHandleSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    selectedRow.current = mockPods[+event.currentTarget.id]; //shorthand convert str to number
    setDisabled(!disabled);
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

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked1(event.target.checked);
    setName(Unit.listCheckboxes[0].name);
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked);
    setName(Unit.listCheckboxes[1].name);
  };

  const checkboxes = (
    <Box
      sx={{ display: "flex", flexDirection: "row", ml: 3, color: "#dc8d0b" }}
    >
      <FormControlLabel
        label={Unit.listCheckboxes[0].name}
        control={
          <Checkbox
            checked={checked1}
            disabled={disabled}
            onChange={handleChange1}
          />
        }
      />
      <FormControlLabel
        label={Unit.listCheckboxes[1].name}
        control={
          <Checkbox
            checked={checked2}
            disabled={disabled}
            onChange={handleChange2}
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
        rows={Module.transformEnableeArray(fn())}
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
        customHandleSelection={customHandleSelection}
        skill={false}
        value={""}
        toggleShowForm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="button-container">
        <button className="button button-orange">submit</button>
      </div>
    </div>
  );
}
