import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import {
  daysUntilPodStarts,
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
import { TogglePodRow } from "./TogglePodRow";
import ITechnology from "../../models/interfaces/ITechnology";

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
  let enablertechStack: ITechnology[] = [];

  useEffect(() => {
    if (isIFEEnabler(enabler)) {
      enablerId = enabler.employeeId;
      enablertechStack = enabler.technology;
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
            <div key={pod.id} className="podRow">
              <TogglePodRow
                pod={pod}
                enablerId={enablerId}
                type={title}
                enablerTechStack={enablertechStack}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
