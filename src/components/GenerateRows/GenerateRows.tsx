import { useEffect, useState } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import {
  GetEnableesWithNoStartDate,
  GetPaginatedEnablees,
} from "../../services/EnableeAPI";
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

// Example on how to use toggleSideBarContext

interface Props {
  pageNum: number;
}

export function GenerateRows({ pageNum }: Props) {
  const [toggle, changeToggle] = useToggle();
  const [details, changeDetails] = useDetails();
  const [enablees, setEnablees] = useState<IEnablee[]>([]);

  useEffect(() => {
    if (pageNum !== -1) getEnablees(pageNum - 1);
    else {
      getPendingStartEnablees();
    }
  }, [pageNum]);

  const getEnablees = async (pageNumber: number) => {
    GetPaginatedEnablees(pageNumber)
      .then((res) => {
        setEnablees(res.data.items);
      })
      .catch((e) => console.error(e));
  };

  const getPendingStartEnablees = async () => {
    GetEnableesWithNoStartDate()
      .then((res) => {
        setEnablees(res.data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      {enablees.map((enablee, i) => {
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
