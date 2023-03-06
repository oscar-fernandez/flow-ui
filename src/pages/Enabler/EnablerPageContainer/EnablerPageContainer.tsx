import "./EnablerPageContainer.css";
import { useLocation } from "react-router";
import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEEnabler from "../../../models/interfaces/IFEEnabler";
import {
  convertToStringArr,
  enablerAssignedPods,
  generateEnablerTags,
  tooltipString,
} from "../../../utils/utilityFunctions";
import Row from "../../../components/RowComponent/Row";
import { Tooltip } from "@mui/material";
import ITechnology from "../../../models/interfaces/ITechnology";
import { TagComponent } from "../../../components/TagComponent/Tag";
import EnablerTemplate from "../../../components/EnablerTemplate/EnablerTemplate";

interface Props {
  hook: (location: string) => any[];
  displayPageCarousel: boolean;
}

/**
 * Gets rendered as a nested route of "/enabler"
 * @param param0 hook for API call
 * @returns rendered enablers placed in styled rows
 */
export function EnablerPageContainer({ hook }: Props) {
  const location = useLocation();
  const [enablers, getEnablers] = hook(location.pathname);
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();
  const [template, setTemplate] = useToggleTemplate();
  /**
   * When EnablerPageContainer renders upon loading,
   * getList constant gets set to the enablers state which is
   * set using the customHook.
   * @returns all enablers
   */
  const getList = (): IFEEnabler[] => {
    return enablers;
  };

  return (
    <>
      <div className="enabler-page-container">
        {getList()?.map((enabler, i) => {
          const tooltip = [...convertToStringArr(enabler.technology)];
          const totalAssignedPods = enablerAssignedPods(
            enabler.numActivePods,
            enabler.numPendingPods
          );
          const statusTag = generateEnablerTags(
            enabler.numActivePods,
            enabler.numPendingPods
          );

          return (
            <Row
              key={i}
              onClick={() => {
                setTemplate(<EnablerTemplate />);
                changeToggle();
                setDetails(enabler);
              }}
            >
              <div className="row-sm-child">
                <div className="square"></div>
              </div>

              <div className="row-md-child row-name">
                <p className="row-primary">{`${enabler.firstName} ${enabler.lastName}`}</p>
                <p className="row-secondary">
                  {enabler.city}, {enabler.state}, {enabler.country}
                </p>
              </div>

              <div>
                <Tooltip
                  className="row-sm-child tags-container"
                  title={tooltipString(tooltip)}
                  placement="bottom-start"
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

              <div className="row-md-child date-container">
                <p className="row-primary">Assigned Pods</p>
                <p className="row-secondary" data-testid="total-assigned-pods">
                  {totalAssignedPods}
                </p>
              </div>

              <div className="row-md-child">
                <p className="row-secondary">Status</p>
                <div className="row-secondary" data-testid="status-tag">
                  {
                    <TagComponent
                      name={statusTag.name}
                      color={statusTag.color}
                    />
                  }
                </div>
              </div>
            </Row>
          );
        })}
      </div>
    </>
  );
}
