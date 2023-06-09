import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import EnableeTemplate from "../../../components/EnableeTemplate/EnableeTemplate";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import Row from "../../../components/RowComponent/Row";
import { TagComponent } from "../../../components/TagComponent/Tag";
import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import IEnablee from "../../../models/interfaces/IEnablee";
import ITechnology from "../../../models/interfaces/ITechnology";
import {
  convertToStringArr,
  generateTags,
  tooltipString,
} from "../../../utils/utilityFunctions";
import { convertStringDateToLocalFormat } from "../../Pod/podUtils";

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
  const [template, setTemplate] = useToggleTemplate();

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

  useEffect(() => {
    getEnablees(page - 1);
  }, [details]);

  return (
    <>
      {/* conditional checks if enablees exists before mapping */}
      {getList()?.map((enablee, i) => {
        const tooltip = [...convertToStringArr(enablee.technology)];
        let startDate: string | null = null;
        let endDate: string | null = null;

        if (
          enablee.enablementStartDate != null &&
          enablee.enablementEndDate != null
        ) {
          startDate = convertStringDateToLocalFormat(
            enablee.enablementStartDate
          );
          endDate = convertStringDateToLocalFormat(enablee.enablementEndDate);
        }

        const statusTag = generateTags(enablee);

        return (
          <Row
            key={i}
            onClick={() => {
              setTemplate(<EnableeTemplate />);
              setDetails(enablee);
              changeToggle();
            }}
          >
            <div className="row-sm-child">
              <div className="square"></div>
            </div>

            <div className="row-child row-name">
              <p className="row-primary">{`${enablee.firstName} ${enablee.lastName}`}</p>
              <p className="row-secondary">{enablee.employeeId}</p>
            </div>

            <div style={{ margin: "0 25px" }}>
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
              {startDate && endDate ? (
                <p className="row-secondary">{`${startDate} - ${endDate}`}</p>
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
          totalPages={enablees?.totalElements ? getTotalPages() : 0}
          currentPageNumber={page}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
