import { useState, useRef } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import "./PodAssignment.css";
import * as Module from "../../Management/mgtUtils";
import * as Unit from "../../Pod/podUtils";
import IEnablee from "../../../models/interfaces/IEnablee";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { dummyEnablees } from "../../../data/EnableeMock";
import { usePendingPodEnablees } from "../Hooks/customHook";
import { mockFePod } from "../../../data/MockFEPod";
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
  const selectedRow = useRef<IFEPod>();
  const { receivedEnablees, setReceivedEnablees } = usePendingPodEnablees();
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [clickable, setClickable] = useState(true);
  const [formValid, setFormValid] = useState(false);

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
    selectedRow.current = mockFePod[+event.currentTarget.id]; //shorthand convert str to number
    const filteredEnablees =
      receivedEnablees &&
      selectedRow &&
      Unit.matchData(receivedEnablees, selectedRow.current);
    setReceivedEnablees(filteredEnablees);
  };

  function increment() {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }

  //temp location
  const updateSelectedEnablees = (index: number) => {
    if (receivedEnablees && selectedRow.current) {
      const e = receivedEnablees?.[index];
      const selectedEnableesCopy = [...selectedEnablees];
      const totalCalculatedEnablees =
        selectedEnablees.length + selectedRow.current.enablee.length;
      if (e) {
        if (!selectedEnableesCopy.includes(e)) {
          if (totalCalculatedEnablees <= 14) {
            setSelectedEnablees([...selectedEnablees, e]);
            increment();
          } else {
            setClickable(false);
          }
        } else {
          selectedEnableesCopy.splice(selectedEnableesCopy.indexOf(e), 1);
          setSelectedEnablees(selectedEnableesCopy);
          decrement();
          setClickable(true);
        }
      }
    }
    if (receivedEnablees) return Module.transformEnableeArray(receivedEnablees);
    return [];
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setName(event.currentTarget.name);
    selectedRow.current && fn();
  };
  // const error = "* Max Capacity Selected";

  // this function needs to be updated to make api call to update pod and enablee
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const updatedEnablees = receivedEnablees?.filter((enablee: IEnablee) => {
      let remove = true;
      selectedEnablees.forEach((item) => {
        item.employeeId === enablee.employeeId ? (remove = false) : null;
      });
      return remove;
    });
    setReceivedEnablees(updatedEnablees);
    setSelectedEnablees([]);
    selectedRow.current = undefined;
  };

  const error = "";

  const radioCheck = (
    <FormControl sx={{ display: "flex" }}>
      <RadioGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          ml: 3,
          color: "#dc8d0b",
        }}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="matchTechStack"
          name="matchTechStack"
          control={<Radio />}
          label="Match Tech Stack"
        />
        <FormControlLabel
          value="containsTechStack"
          name="containsTechStack"
          control={<Radio />}
          label="Contains Tech Stack"
        />
      </RadioGroup>
    </FormControl>
  );

  return (
    <div>
      <form action="">
        <div>
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="container">
            {/* <PageViewHeader pageTitle="Enablee" showPlus={true} /> */}
            {radioCheck}
            <CustomTableContainer
              clickable={clickable}
              headers={headersEnablee}
              headerStyle={headerStyle}
              rows={fn()}
              cellStyle={cellStyle}
              rowStyle={rowStyle}
              //  toggle={toggle}
              updateSelectedEnablees={updateSelectedEnablees}
              skill={false}
              value={""}
              toggleShowForm={() => {
                return null;
              }}
            />

            <div className="container">
              <CustomTableContainer
                clickable={clickable}
                headers={headersPods}
                headerStyle={headerStyle}
                rows={Unit.transformPodArray(
                  mockFePod,
                  selectedRow.current?.id,
                  count
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
            <button
              className="button button-orange"
              disabled={selectedEnablees.length === 0 || !selectedRow.current}
              // type='submit'
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
