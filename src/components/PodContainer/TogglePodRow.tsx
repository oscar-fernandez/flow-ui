import { useToggleDetail } from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEPod from "../../models/interfaces/IFEPod";
import ITechnology from "../../models/interfaces/ITechnology";
import {
  getPodProgressPercentage,
  PodEnableeEnablerRatio,
  daysUntilPodStarts,
  isPod,
} from "../../utils/utilityFunctions";

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
  function getSharedTechnologies(techstack: ITechnology[]): ITechnology[] {
    if (pod && isPod(pod)) {
      return techstack.filter((enablertech) => {
        return pod.project.technology.find((podtech) => {
          return enablertech.name == podtech.name;
        });
      });
    }
    return [];
  }

  return (
    <>
      <div className="">{pod.podName}</div>

      <input
        key={pod.id}
        className="enablee-checkbox"
        data-testid="enableeCheckbox"
        type="checkbox"
        //should be disabled if state checkBoxesDisabled is true and this box is not checked

        //Checks pod Enabler list to see if the selected Enabler id exists in the list
        //If so the box is checked
        checked={pod.enabler?.some((e) => {
          e.employeeId == enablerId;
        })}
      />
      {getSharedTechnologies(enablerTechStack).map((tech) => {
        <span
          key={tech.id}
          className="enabler-tech"
          style={{
            backgroundColor: tech.backgroundColor,
          }}
        ></span>;
      })}

      {/* Displays the Enablee : Enabler Ratio */}
      <div className="EnablerEnableeRatioDisplay">
        {PodEnableeEnablerRatio(pod).enableeRatio}:
        {PodEnableeEnablerRatio(pod).enablerRatio}
      </div>
      {type.includes("Active") ? (
        <div className="Podprogess">{getPodProgressPercentage(pod)} %</div>
      ) : (
        <div className="DaysUntilPodStarts">
          {daysUntilPodStarts(pod.podStartDate)}d
        </div>
      )}
    </>
  );
}
