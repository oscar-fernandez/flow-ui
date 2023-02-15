import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  useToggle,
  useToggleDetail,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEEnabler from "../../../models/interfaces/IFEEnabler";
import {
  convertToStringArr,
  generateTags,
  tooltipString,
} from "../../../utils/utilityFunctions";
import Row from "../../../components/RowComponent/Row";
import { Tooltip } from "@mui/material";
import ITechnology from "../../../models/interfaces/ITechnology";
import { TagComponent } from "../../../components/TagComponent/Tag";

interface Props {
  hook: (location: string) => any[];
  displayPageCarousel: boolean;
}

export function EnablerPageContainer({ hook, displayPageCarousel }: Props) {
  const location = useLocation();
  const [enablers, getEnablers] = hook(location.pathname);
  const [page, setPage] = useState(1);
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();

  const getTotalPages = () => {
    return Math.ceil(enablers.totalElements / 25);
  };

  const getList = (): IFEEnabler[] => {
    if (enablers?.items) {
      return enablers.items;
    } else {
      return enablers;
    }
  };

  useEffect(() => {
    if (enablers?.items) {
      getEnablers(page - 1);
    }
  }, [page]);

  return (
    <>
      {getList()?.map((enabler, i) => {
        const tooltip = [...convertToStringArr(enabler.technology)];
        return (
          <Row
            key={i}
            onClick={() => {
              changeToggle();
              setDetails(enabler);
            }}
          >
            <div className="row-sm-child">
              <div className="square"></div>
            </div>

            <div className="row-md-child row-name">
              <p className="row-primary">{`${enabler.firstName} ${enabler.lastName}`}</p>
              <p className="row-secondary">{enabler.employeeId}</p>
            </div>

            <div>
              <Tooltip
                className="row-sm-child tags-container"
                title={tooltipString(tooltip)}
                placement="bottom"
              >
                <div>
                  {enabler.technology
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
            </div>

            <div className="row-lg-child date-container">
              <p className="row-primary">Assigned Pods</p>
              {enabler.numActivePods ? (
                <p className="row-secondary">{enabler.numActivePods}</p>
              ) : (
                <p className="row-secondary">Empty</p>
              )}
            </div>
          </Row>
        );
      })}
    </>
  );
}
