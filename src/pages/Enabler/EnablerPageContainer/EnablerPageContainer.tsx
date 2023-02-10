import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import Row from "../../../components/RowComponent/Row";
import { TagComponent } from "../../../components/TagComponent/Tag";
import {
  useToggle,
  useToggleDetail,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import IEnablee from "../../../models/interfaces/IEnablee";
import ITechnology from "../../../models/interfaces/ITechnology";
import {
  convertToStringArr,
  generateTags,
  tooltipString,
} from "../../../utils/utilityFunctions";

interface Props {
  hook: (location: string) => any[];
  displayPageCarousel: boolean;
}

export function EnableePageContainer({ hook, displayPageCarousel }: Props) {
  const location = useLocation();
  const [enablers, getEnablers] = hook(location.pathname);
  const [page, setPage] = useState(1);
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();

  const getTotalPages = () => {
    return Math.ceil(enablers.totalElements / 25);
  };

  const getList = (): IEnablee[] => {
    /* conditional checks if enablees is a PageOfItems<IEnablee> instead of IEnablee[] */
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
      {/* conditional checks if enablees exists before mapping */}
      {getList()?.map((enabler, i) => {
        const tooltip = [...convertToStringArr(enabler.technology)];
        const startDate = new Date(enabler.enablementStartDate);
        const endDate = new Date(enabler.enablementEndDate);
        const statusTag = generateTags(enabler);
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

            <div className="row-child row-name">
              <p className="row-primary">{`${enabler.firstName} ${enabler.lastName}`}</p>
              <p className="row-secondary">{enabler.employeeId}</p>
            </div>

            <div style={{ margin: "0 25px" }}>
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
              <p className="row-primary">Enablement Dates</p>
              {enabler.enablementStartDate ? (
                <p className="row-secondary">{`${startDate.toLocaleString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )} - ${endDate.toLocaleString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`}</p>
              ) : (
                <p className="row-secondary">Empty</p>
              )}
            </div>

            <div className="row-lg-child">
              <p className="row-secondary">Status</p>
              <TagComponent name={statusTag.name} color={statusTag.color} />
            </div>
          </Row>
        );
      })}
      {displayPageCarousel ? (
        <PageNumberCarousel
          totalPages={enablers?.totalElements ? getTotalPages() : 0}
          currentPageNumber={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
