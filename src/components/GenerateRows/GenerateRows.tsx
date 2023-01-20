import { useEffect, useState } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import ITechnology from "../../models/interfaces/ITechnology";
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
import "./GenerateRows.css";
import { TagComponent } from "../TagComponent/Tag";
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
        const startDate = new Date(enablee.enablementEndDate);
        const endDate = new Date(enablee.enablementEndDate);
        return (
          <Row
            key={i}
            onClick={() => {
              changeToggle();
              changeDetails(enablee);
            }}
          >
            <div className="row-sm-child">
              <div className="square"></div>
            </div>

            <div className="row-child row-name">
              <p className="row-primary">{`${enablee.firstName} ${enablee.lastName}`}</p>
              <p className="row-secondary">{enablee.employeeId}</p>
            </div>

            <Tooltip
              className="row-sm-child tags-container"
              title={tooltipString(tooltip)}
              placement="bottom"
            >
              <div>
                {enablee.technology
                  .slice(0, 2)
                  .map((tech: ITechnology, i: number) => (
                    <TagComponent
                      data-testid="tech-stack"
                      name={tech.name}
                      color={tech.backgroundColor}
                      key={i}
                    />
                  ))}
              </div>
            </Tooltip>

            <div className="row-lg-child date-container">
              <p className="row-primary">Enablement Dates</p>
              <p className="row-secondary">{`${startDate.toLocaleString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              )} - ${endDate.toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}</p>
            </div>

            <div className="row-lg-child">
              <p className="row-secondary">Enablement Status</p>

              <p>{enablee.assetTag}</p>
            </div>
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
