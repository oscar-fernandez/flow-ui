import { useState, useRef } from "react";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import "./PodAssignment.css";
import * as Module from "../../Management/mgtUtils";
import * as Unit from "../../Pod/podUtils";
import IEnablee from "../../../models/interfaces/IEnablee";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import {
  useHolderAvailablePods,
  usePendingPodEnablees,
} from "../Hooks/customHook";
import IFEPod from "../../../models/interfaces/IFEPod";

const headersEnablee = [
  "Employee Id",
  "First Name",
  "Last Name",
  "Tech Stack",
  "Enablement Start Date",
  "Enablement End Date",
];

const headersPods = [
  "Pod Name",
  "Project",
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
  const [selectedEnablees, setSelectedEnablees] = useState<IEnablee[]>([]);
  const selectedRow = useRef<IFEPod>({} as IFEPod);
  const { receivedEnablees, setReceivedEnablees } = usePendingPodEnablees();
  const { availablePods, setAvailablePods } = useHolderAvailablePods();
  // const [availablePods, setAvailablePods] = useState<IFEPod[]>(mockFePod);
  const [name, setName] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const totalCalculatedEnablees =
    selectedEnablees.length + (selectedRow.current.enablee?.length || 0);

  function fn(): string[][] {
    if (receivedEnablees && selectedRow.current) {
      switch (name) {
        case "matchTechStack":
          return Module.transformEnableeArray(
            Unit.matchAllSkills(receivedEnablees, selectedRow.current)
          );
        case "containsTechStack":
          return Module.transformEnableeArray(
            Unit.matchSomeSkills(receivedEnablees, selectedRow.current)
          );

        case "availableEnablees":
          return Module.transformEnableeArray(
            Unit.matchData(receivedEnablees, selectedRow.current)
          );
      }
    }
    if (receivedEnablees) return Module.transformEnableeArray(receivedEnablees);
    return [];
  }

  const customHandleSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    if (selectedRow.current === availablePods[+event.currentTarget.id]) {
      return;
    }
    selectedRow.current = availablePods[+event.currentTarget.id]; //shorthand convert str to number
    const filteredEnablees =
      receivedEnablees &&
      selectedRow &&
      Unit.matchData(receivedEnablees, selectedRow.current);
    setReceivedEnablees(filteredEnablees);
    setSelectedEnablees([]);
  };

  //temp location
  const updateSelectedEnablees = (index: number) => {
    if (receivedEnablees && selectedRow.current) {
      const e = receivedEnablees?.[index];
      const selectedEnableesCopy = [...selectedEnablees];
      if (e) {
        if (
          !selectedEnableesCopy.includes(e) &&
          totalCalculatedEnablees <= 14
        ) {
          setSelectedEnablees([...selectedEnablees, e]);
        }

        if (selectedEnableesCopy.includes(e)) {
          selectedEnableesCopy.splice(selectedEnableesCopy.indexOf(e), 1);
          setSelectedEnablees(selectedEnableesCopy);
        }
      }
    }
    if (receivedEnablees) return Module.transformEnableeArray(receivedEnablees);
    return [];
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectValue === "" || name !== event.currentTarget.name) {
      setSelectValue(event.target.value);
      setName(event.currentTarget.name);
      selectedRow.current && fn();
    } else {
      setSelectValue("");
      setName("availableEnablees");
      selectedRow.current && fn();
    }
  };

  // this function needs to be updated to make api call to update pod and enablee
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const updatedEnablees = receivedEnablees?.filter((enablee: IEnablee) => {
      let remove = true;
      selectedEnablees.forEach((item) => {
        if (item.employeeId === enablee.employeeId) {
          remove = false;
        }
      });
      return remove;
    });
    setReceivedEnablees(updatedEnablees);
    const copyOfAvailablePods = [...availablePods];
    const targetPodIndex = copyOfAvailablePods.findIndex(
      (podRow) => podRow === selectedRow.current
    );
    copyOfAvailablePods[targetPodIndex].enablee = [
      ...copyOfAvailablePods[targetPodIndex].enablee,
      ...selectedEnablees,
    ];
    if (copyOfAvailablePods[targetPodIndex].enablee.length === 15) {
      copyOfAvailablePods.splice(targetPodIndex, 1);
      selectedRow.current = {} as IFEPod;
    }
    setAvailablePods(copyOfAvailablePods);
    setSelectedEnablees([]);
  };

  const radioButtonCheckboxes = (
    <FormControl
      sx={{ display: "flex", flexDirection: "row", ml: 3, color: "#585887" }}
    >
      <FormControlLabel
        control={
          <Checkbox
            color="warning"
            checked={selectValue === "matchTechStack"}
            onChange={handleChange}
            value="matchTechStack"
            name="matchTechStack"
          />
        }
        label="Match Tech Stack"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="warning"
            checked={selectValue === "containTechStack"}
            onChange={handleChange}
            value="containTechStack"
            name="containTechStack"
          />
        }
        label="Contains Tech Stack"
      />
    </FormControl>
  );

  return (
    <div>
      <form action="">
        <div>
          <div className="containerPodAssignment">
            {radioButtonCheckboxes}
            <CustomTableContainer
              clickable={totalCalculatedEnablees < 15}
              headers={headersEnablee}
              headerStyle={headerStyle}
              rows={fn()}
              cellStyle={cellStyle}
              rowStyle={rowStyle}
              updateSelectedEnablees={updateSelectedEnablees}
              skill={false}
              value={""}
              toggleShowForm={() => {
                return null;
              }}
            />

            <div className="containerPodAssignment">
              <CustomTableContainer
                clickable={totalCalculatedEnablees < 15}
                headers={headersPods}
                headerStyle={headerStyle}
                rows={Unit.transformPodArray(
                  availablePods,
                  selectedRow.current?.id,
                  selectedEnablees.length
                )}
                cellStyle={cellStyle}
                rowStyle={rowStyle}
                customHandleSelection={customHandleSelection}
                skill={false}
                value={""}
                toggleShowForm={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
            <div
              style={{
                color: "red",
                display: "flex",
                justifyContent: "end",
                marginBottom: "15px",
              }}
            >
              {totalCalculatedEnablees === 15 ? (
                <div className="error">* Max Capacity Selected</div>
              ) : (
                ""
              )}
            </div>

            <button
              className="button button-orange"
              disabled={selectedEnablees.length === 0 || !selectedRow.current}
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
