import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import Row from "../../../components/RowComponent/Row";
import { TagComponent } from "../../../components/TagComponent/Tag";
import IEnablee from "../../../models/interfaces/IEnablee";
import IPageOfItems from "../../../models/interfaces/IPageOfItems";
import ITechnology from "../../../models/interfaces/ITechnology";
import {
  convertToStringArr,
  generateTags,
  tooltipString,
} from "../../../utils/utilityFunctions";

interface Props {
  hook: () => any[];
  displayPageCarousel: boolean;
}

export function EnableePageContainer({ hook, displayPageCarousel }: Props) {
  const [enablees, getEnablees] = hook();
  const [page, setPage] = useState(1);

  const getTotalPages = () => {
    if (enablees !== null) {
      return Math.ceil(enablees.totalElements / 25);
    } else {
      return 0;
    }
  };

  const getList = (): IEnablee[] => {
    if (enablees?.items) {
      return enablees.items;
    } else {
      return enablees;
    }
  };

  useEffect(() => {
    getEnablees(page);
  }, [page]);

  return (
    <>
      {getList().map((enablee, i) => {
        const tooltip = [...convertToStringArr(enablee.technology)];
        const startDate = new Date(enablee.enablementStartDate);
        const endDate = new Date(enablee.enablementEndDate);
        const statusTag = generateTags(enablee);
        return (
          <Row
            key={i}
            onClick={() => 1}
            // onClick={() => {
            //   changeToggle();
            //   changeDetails(enablee);
            // }}
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

            <div className="row-lg-child">
              <p className="row-secondary">Status</p>
              <TagComponent name={statusTag.name} color={statusTag.color} />
            </div>
          </Row>
        );
      })}
      {displayPageCarousel ? (
        <PageNumberCarousel
          totalPages={getTotalPages()}
          currentPageNumber={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
