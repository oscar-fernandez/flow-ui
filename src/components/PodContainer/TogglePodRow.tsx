import {
  useToggleArrow,
  useToggleDetail,
  useTogglePrevDetails,
  useToggleTemplate,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { badgesArray, pickBadgePicture } from "../../data/BadgesArray";
import IFEPod from "../../models/interfaces/IFEPod";
import ITechnology from "../../models/interfaces/ITechnology";
import {
  getPodProgressPercentage,
  PodEnableeEnablerRatio,
  daysUntilPodStarts,
  isPod,
  getSharedTechnologies,
} from "../../utils/utilityFunctions";
import PodTemplate from "../PodTemplate/PodTemplate";
import "./TogglePodContainer.css";

/**
 * pod
 *    The passed in Pod
 * enablerId
 *    If an enabler was selected
 *      then the enabler id will passed
 *    else
 *      0 was passed
 * type
 *    Determines if the Container is for Active or Upcoming
 * enablerTechStack
 *    if an enabler was selected
 *      then the enabler technology was passed
 *    else
 *      [] was passed
 */
interface Props {
  pod: IFEPod;
  enablerId: number;
  type: string;
  enablerTechStack: ITechnology[];
}

export function TogglePodRow({
  pod,
  enablerId,
  type,
  enablerTechStack,
}: Props) {
  const [template, setTemplate] = useToggleTemplate();
  const [details, setDetails] = useToggleDetail();
  const [prevDetails, setPrevDetails] = useTogglePrevDetails();
  const [toggleArrow, setToggleArrow] = useToggleArrow();
  /**
   * if badgePicture exists for pod
   *    returns the index of that image from the array
   * else
   *  returns -1
   */
  const badgeIndex = pickBadgePicture(pod);

  return (
    <div className="podRowContainer">
      {/**Display the pods name */}
      <div className="podName">
        <a
          onClick={() => {
            details && setPrevDetails([...prevDetails, details]);
            setDetails(pod);
            setTemplate(<PodTemplate />);
            setToggleArrow(true);
          }}
        >
          {pod.podName}
        </a>
      </div>
      {/**
       * CheckBox
       *  If the enabler is already assigned to the checkbox
       *    it will start as checked
       *  else
       *    unchecked
       */}
      <input
        key={pod.id}
        className="pod-checkbox"
        data-testid="podCheckbox"
        type="checkbox"
        checked={pod.enabler?.some((e) => {
          return e.employeeId == enablerId;
        })}
        onChange={() => 1}
      />
      <div>
        {/**Displays the badge for the pod if it exists else displays generic logo */}
        {badgeIndex != -1 ? (
          <img className="podBadge" src={badgesArray[badgeIndex].path} />
        ) : (
          <img className="toggleSquare" />
        )}
        {/**Displays the shared technology between the pod and enabler as a colored squares */}
        {getSharedTechnologies(enablerTechStack, pod).map((tech) => (
          <span
            key={tech.id}
            className="enabler-tech"
            style={{
              backgroundColor: tech.backgroundColor,
            }}
          ></span>
        ))}
      </div>

      {/* Displays the Enablee : Enabler Ratio */}
      <div className="EnablerEnableeRatioDisplay lightGreyColor">
        {PodEnableeEnablerRatio(pod).enableeRatio}:
        {PodEnableeEnablerRatio(pod).enablerRatio}
      </div>
      {/**
       * if {type} contains the word Active
       *    Displays the pod progression until completion
       * else
       *    Displays days until pod begins
       */}
      {type.includes("Active") ? (
        <div className="Podprogess lightGreyColor">
          {getPodProgressPercentage(pod)} %
        </div>
      ) : (
        <div className="DaysUntilPodStarts lightGreyColor">
          {daysUntilPodStarts(pod.podStartDate)}d
        </div>
      )}
    </div>
  );
}
