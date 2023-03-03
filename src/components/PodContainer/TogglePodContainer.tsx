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
import "./TogglePodContainer";
import { json } from "react-router";
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
  infoString: string;
}
/**
 *
 * @Props
 * title:String- used to determine if the Pod is an Active or Upcoming poods
 *
 */
export function TogglePodContainer({ title, infoString }: Props) {
  /**
   * map- contains a Map of the the Enabler Active and Pending Pods
   * enabler-contains the selected Enabler or undefined if an empty Template
   * listofPods- Holds the list of Active or Pending pod depending of the value of {title}
   *
   */
  const [map, setMap] = useMapDetail();
  const [enabler, setEnabler] = useToggleDetail();
  const [listOfPods, setListofPods] = useState<IFEPod[] | undefined>([]);

  /**
   * Checks if enabler is of type IFEEnabler
   *  If {title} contains the word Active
   *    listOfPods will hold the Active pods of the enabler
   * else
   *    listOfPods will hold the Pending pods of the enabler
   */

  useEffect(() => {
    if (isIFEEnabler(enabler)) {
      if (title.includes("Active")) {
        setListofPods(map?.get("Active"));
      } else {
        setListofPods(map?.get("Pending"));
      }
    }
  }, [enabler]);

  return (
    <>
      {/**
       * Displays the Title for the PodContainer as well as icon information
       */}
      <div className="TitleContainer">
        <PageViewHeader
          pageTitle={title}
          showPlus={false}
          showIcon={true}
          infoString={infoString}
          plusClicked={false}
          handleClick={() => {
            return;
          }}
          isHeader={true}
        />
      </div>
      {/**
       * Displays the rows of Pod
       * If enabler if of type IFEEnabler
       *    the enabler id and technology will be passed
       * else
       *    the 0 and [] will be passed instead
       */}
      <div className="displayingPods">
        {listOfPods?.map((pod) => {
          return (
            <div key={pod.id} className="podRow">
              <TogglePodRow
                pod={pod}
                enablerId={isIFEEnabler(enabler) ? enabler.employeeId : 0}
                type={title}
                enablerTechStack={
                  isIFEEnabler(enabler) ? enabler.technology : []
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
