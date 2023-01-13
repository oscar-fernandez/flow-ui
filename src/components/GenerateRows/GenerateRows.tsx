import { dummyEnablees } from "../../data/EnableeMock";
import Row from "../RowComponent/Row";
import { Tooltip } from "@mui/material";
import {
  convertToStringArr,
  shortenStringList,
  tooltipString,
} from "../../utils/utilityFunctions";
import {
  useDetails,
  useToggle,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import ToggleSidebar, { Action } from "../ToggleSideBar/ToggleSidebar";

export function GenerateRows() {
  // Example on how to use toggleSideBarContext
  const [toggle, changeToggle] = useToggle();
  const [details, changeDetails] = useDetails();

  return (
    <>
      {dummyEnablees.map((enablee, i) => {
        const tooltip = [...convertToStringArr(enablee.technology)];
        const techDisplay = shortenStringList(tooltip);
        return (
          <Row
            key={i}
            onClick={() => {
              changeToggle();
              changeDetails(enablee);
            }}
          >
            <p className="row-child row-id">{enablee.employeeId}</p>
            <p className="row-child">{enablee.firstName}</p>
            <p className="row-child">{enablee.lastName}</p>
            <Tooltip
              className="row-child"
              title={tooltipString(tooltip)}
              placement="bottom"
            >
              <p data-testid="tech-stack">{techDisplay}</p>
            </Tooltip>
          </Row>
        );
      })}
      <ToggleSidebar
        toggle={toggle}
        setToggle={() => {
          changeToggle();
        }}
        details={details}
        action={Action.VIEW}
      />
    </>
  );
}
