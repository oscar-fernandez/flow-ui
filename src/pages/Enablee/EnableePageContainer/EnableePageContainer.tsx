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
  const [enablees, getEnablees] = hook(location.pathname);
  const [page, setPage] = useState(1);
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();

  const getTotalPages = () => {
    return Math.ceil(enablees.totalElements / 25);
  };

  const getList = (): IEnablee[] => {
    /* conditional checks if enablees is a PageOfItems<IEnablee> instead of IEnablee[] */
    if (enablees?.items) {
      return enablees.items;
    } else {
      return enablees;
    }
  };

  useEffect(() => {
    if (enablees?.items) {
      getEnablees(page - 1);
    }
  }, [page]);

  return (
    <>
      {/* conditional checks if enablees exists before mapping */}
      {getList()?.map((enablee, i) => {
        const tooltip = [...convertToStringArr(enablee.technology)];
        const startDate = new Date(enablee.enablementStartDate);
        const endDate = new Date(enablee.enablementEndDate);
        const statusTag = generateTags(enablee);
        return (
          <Row
            key={i}
            onClick={() => {
              changeToggle();
              setDetails(enablee);
            }}
          >
            <div className="row-sm-child">
              <div className="square"></div>
            </div>

            <div className="row-md-child row-name">
              <p className="row-primary">{`${enablee.firstName} ${enablee.lastName}`}</p>
              <p className="row-secondary">{enablee.employeeId}</p>
            </div>

            <div>
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
            </div>

            <div className="row-lg-child date-container">
              <p className="row-primary">Enablement Dates</p>
              {enablee.enablementStartDate ? (
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

            {location.pathname === "/enablee/pendingStart" ? null : (
              <div className="row-md-child">
                <p className="row-secondary">Status</p>
                <TagComponent name={statusTag.name} color={statusTag.color} />
              </div>
            )}
          </Row>
        );
      })}
      {displayPageCarousel ? (
        <PageNumberCarousel
          totalPages={enablees?.totalElements ? getTotalPages() : 0}
          currentPageNumber={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
