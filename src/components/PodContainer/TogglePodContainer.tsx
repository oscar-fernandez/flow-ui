import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import {
  getPodProgressPercentage,
  isEnableeValidForPod,
  isIFEEnabler,
  PodEnableeEnablerRatio,
} from "../../utils/utilityFunctions";
import {
  useMapDetail,
  useToggleDetail,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { useEffect, useState } from "react";
import { getActivePods, getPendingPods } from "../../services/PodAPI";
import IFEPod from "../../models/interfaces/IFEPod";
import { useActivePods } from "../../pages/Pod/Hooks/customHook";
import Checkbox from "../UtilFormComponents/CheckboxContainer";

/**
 * This componet is a container to display the Pods for an Enabler,
 * the component is modular and can be used for Active and Pending Pod depending on
 * what props are passed to the component
 *
 * @Props
 *  title: Will be passed to the PageViewHeader to display the title
 * infoString: Will be passed to the PageViewHeader to display when hovering over the icon
 *
 */
interface Props {
  title: string;
}

export function TogglePodContainer({ title }: Props) {
  const [map, setMap] = useMapDetail();
  const [enabler, setEnabler] = useToggleDetail();
  const [listOfPods, setListofPods] = useState<IFEPod[] | undefined>([]);
  let enablerId = 0;

  useEffect(() => {
    if (isIFEEnabler(enabler)) {
      enablerId = enabler.employeeId;

      if (title.includes("Active")) {
        setListofPods(map?.get("Active"));
      } else {
        setListofPods(map?.get("Pending"));
      }
    }
  });

  return (
    <>
      <div className="TitleContainer">
        <PageViewHeader
          pageTitle={title}
          showPlus={false}
          showIcon={true}
          infoString={"Displays Enablee: Enabler Ratio and Progress"}
          plusClicked={false}
          handleClick={() => {
            return;
          }}
          isHeader={true}
        />
      </div>
      <div className="displayingPods">
        {listOfPods?.map((pod) => {
          return (
            <>
              <div className="">{pod.podName}</div>

              <input
                key={pod.id}
                className="enablee-checkbox"
                data-testid="enableeCheckbox"
                type="checkbox"
                //should be disabled if state checkBoxesDisabled is true and this box is not checked

                checked={pod.enabler?.some((e) => {
                  e.employeeId == enablerId;
                })}
              />

              <div className="EnablerEnableeRatioDisplay">
                {PodEnableeEnablerRatio(pod).enableeRatio}:{" "}
                {PodEnableeEnablerRatio(pod).enablerRatio}
              </div>

              <div className="Podprogess"></div>

              <div className="DaysUntilPodStarts"></div>
            </>
          );
        })}
      </div>
    </>
  );
}
