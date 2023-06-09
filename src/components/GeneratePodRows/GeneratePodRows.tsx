import IFEPod from "../../models/interfaces/IFEPod";
import ITechnology from "../../models/interfaces/ITechnology";
import Row from "../RowComponent/Row";
import { Tooltip } from "@mui/material";
import {
  convertToStringArr,
  shortenStringList,
  tooltipString,
} from "../../utils/utilityFunctions";
import { convertStringDateToLocalFormat } from "../../pages/Pod/podUtils";
import "./GeneratePodRows.css";
import { TagComponent } from "../TagComponent/Tag";
import IDisplayTag from "../../models/interfaces/IDisplayTag";
import AlertContainer from "../Alert/AlertContainer";
import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import ToggleSidebar from "../ToggleSideBar/ToggleSidebar";
import { badgesArray, pickBadgePicture } from "../../data/BadgesArray";
import PodTemplate from "../PodTemplate/PodTemplate";

interface Props {
  pods: IFEPod[];
  displayTag: (pod: IFEPod) => IDisplayTag;
  location: string;
}

export function GeneratePodRows({ pods, displayTag, location }: Props) {
  const [toggle, changeToggle] = useToggle();
  const [details, setDetails] = useToggleDetail();
  const [template, setTemplate] = useToggleTemplate();

  let badgeIndex = 0;

  const handleCreatePodClick = () => {
    setDetails(null);
    setTemplate(<PodTemplate />);
    changeToggle();
  };

  const isPodEmpty = pods?.length === 0;

  return (
    <>
      {isPodEmpty ? (
        <div data-testid="alert-container">
          <AlertContainer
            text={`No ${location} Pods`}
            buttonText={"Create Pod"}
            handleClick={handleCreatePodClick}
          />
          {/* <ToggleSidebar template={<div>Pod Side Bar</div>} /> */}
        </div>
      ) : (
        pods?.map((pod, i) => {
          const tooltip = [...convertToStringArr(pod.project.technology)];
          const techDisplay = shortenStringList(tooltip);
          const startDate = convertStringDateToLocalFormat(pod.podStartDate);
          const endDate = convertStringDateToLocalFormat(pod.podEndDate);
          const tag = displayTag(pod);
          let enablerNames = "";

          if (pod.enabler !== null && pod.enabler.length == 1) {
            enablerNames = pod.enabler[0].firstName;
          } else if (pod.enabler !== null) {
            enablerNames =
              pod.enabler[0].firstName + ", " + pod.enabler[1].firstName;
          }

          badgeIndex = pickBadgePicture(pod);

          return (
            <Row
              key={i}
              onClick={() => {
                // changeToggle();
                setDetails(pod);
                setTemplate(<PodTemplate />);
                changeToggle();
              }}
            >
              <div className="row-sm-child">
                {badgeIndex != -1 ? (
                  <img className="img" src={badgesArray[badgeIndex].path} />
                ) : (
                  <div className="square" />
                )}
              </div>

              <div className="row-child row-name">
                <p className="row-primary">{`${pod.podName}`}</p>
                <p className="row-secondary">{`Enabler(s): ${enablerNames}`}</p>
              </div>

              <div style={{ margin: "0 25px" }}>
                <Tooltip
                  className="row-sm-child tags-container"
                  title={tooltipString(tooltip)}
                  placement="bottom"
                >
                  <div>
                    {pod.project?.technology !== null ? (
                      pod.project.technology
                        .slice(0, 2)
                        .map((tech: ITechnology, i: number) => (
                          <TagComponent
                            data-testid="tech-stack"
                            name={tech.name}
                            color={tech.backgroundColor}
                            key={tech.id}
                          />
                        ))
                    ) : (
                      <TagComponent
                        data-testid="tech-stack"
                        name={""}
                        color={""}
                        key={i}
                      />
                    )}
                  </div>
                </Tooltip>
              </div>

              <div className="row-lg-child date-container">
                {pod.podStartDate ? (
                  <p className="row-secondary">{`${startDate} - `}</p>
                ) : (
                  <p className="row-secondary">Empty</p>
                )}
                <p className="row-secondary">{`${endDate}`}</p>
              </div>

              <div className="row-lg-child">
                <p className="row-secondary">{`Total Enablees: ${
                  pod.enablee !== null ? pod.enablee.length : 0
                } of 15`}</p>
                <TagComponent name={tag.name} color={tag.color} />
              </div>
            </Row>
          );
        })
      )}
    </>
  );
}
