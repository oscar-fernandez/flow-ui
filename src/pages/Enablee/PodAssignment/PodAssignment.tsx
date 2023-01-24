import {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  SetStateAction,
} from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import "./PodAssignment.css";
import * as Module from "../../Management/mgtUtils";
import * as Unit from "../../Pod/podUtils";
import IEnablee from "../../../models/interfaces/IEnablee";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  SxProps,
  Theme,
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
  const selectedEnablees = useRef<IEnablee[]>([]);
  // const selectedRow = useRef({});
  const [selectedRow, setSelectedRow] = useState<IFEPod>();
  const { receivedEnablees, setReceivedEnablees } = usePendingPodEnablees();
  const [name, setName] = useState("");
  const [checkbox, setCheckbox] = useState({
    matchTechStack: false,
    containsTechStack: false,
  });

  const [disabled, setDisabled] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(0);

  function fn(): string[][] {
    if (receivedEnablees) {
      switch (name) {
        case "matchTechStack":
          return Module.transformEnableeArray(
            Unit.matchAllSkills(receivedEnablees, mockFePod[0])
          );
        case "containsTechStack":
          return Module.transformEnableeArray(
            Unit.matchSomeSkills(receivedEnablees, mockFePod[0])
          );
        case "availableEnablees":
          return Module.transformEnableeArray(
            Unit.matchData(receivedEnablees, mockFePod[0])
          );
        default:
          return Module.transformEnableeArray(receivedEnablees);
      }
    }
    return [];
  }

  const customHandleSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    //selectedRow.current = mockFePod[+event.currentTarget.id];

    setSelectedRow(mockFePod[+event.currentTarget.id]);
    setToggle(!toggle);
    setDisabled(!disabled);

    const filteredEnablees =
      selectedRow &&
      receivedEnablees &&
      Unit.matchData(receivedEnablees, selectedRow);
    setReceivedEnablees(filteredEnablees);

    // console.log(filteredEnablees);

    // if (disabled) {
    //   setReceivedEnablees;
    // }
    setDisabled(!disabled);
  };

  // useEffect(() => {
  // }, [selectedRow]);

  // useEffect(() => {
  // }, [receivedEnablees]);

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
    const e = receivedEnablees?.[index];
    const ar = selectedEnablees.current;
    if (e) {
      if (!ar.includes(e)) {
        ar.push(e);
        // increment();
      } else {
        ar.splice(ar.indexOf(e), 1);
        // decrement();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox({
      ...checkbox,
      [event.target.name]: event.currentTarget.checked,
    });
    setName(event.currentTarget.name);
    // fn();
  };

  const { matchTechStack, containsTechStack } = checkbox;
  const error = [matchTechStack, containsTechStack].filter((v) => v).length > 1;

  const checkboxes = (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        error={error}
        sx={{ m: 3 }}
        component="fieldset"
        variant="standard"
      >
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 3,
            color: "#dc8d0b",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={matchTechStack}
                // disabled={disabled}
                onChange={handleChange}
                name="matchTechStack"
              />
            }
            label="Match Tech Stack"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={containsTechStack}
                // disabled={disabled}
                onChange={handleChange}
                name="containsTechStack"
              />
            }
            label="Contains TechS tack"
          />
        </FormGroup>
        <FormHelperText>Be careful, you can mark just one</FormHelperText>
      </FormControl>
    </Box>
  );

  return (
    <div className="container">
      <PageViewHeader pageTitle="Enablee" showPlus={true} />
      {checkboxes}
      <CustomTableContainer
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

      <div className="container"></div>
      <CustomTableContainer
        headers={headersPods}
        headerStyle={headerStyle}
        rows={Unit.transformPodArray(mockFePod, count)}
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
