import "./PodPageContainer.css";
import PageNumberCarousel from "../../components/PageNumberCarousel/PageNumberCarousel";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
//import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IFEPod from "../../models/interfaces/IFEPod";
import IDisplayTag from "../../models/interfaces/IDisplayTag";
import {
  useActivePods,
  useAvailablePods,
  useCompletedPods,
} from "./Hooks/customHook";

interface Props {
  hook: () => {
    podList: IFEPod[];
    setPodList: Dispatch<SetStateAction<IFEPod[]>>;
  };
  displayPageCarousel: boolean;
  displayTag: (pod: IFEPod) => IDisplayTag;
  podType: string;
}
export default function PodPageContainer({
  hook,
  displayPageCarousel,
  displayTag,
  podType,
}: Props) {
  const pods: IFEPod[] = [];

  const { podList, setPodList } = hook();

  /* switch (podType) {
    case "Available":
      const { availablePodList, setAvailablePodList } = useAvailablePods();
      pods = availablePodList;
      break;
    case "Completed":
      const { completedPodList, setCompletedPodList } = useCompletedPods();
      pods = completedPodList;
      break;
    case "Active":
      const { activePodList, setActivePodList } = useActivePods();
      pods = activePodList;
  }  */

  return (
    <>
      <div data-testid="pageSectionTestId" className="page-section">
        {
          <GeneratePodRows
            pageNum={0}
            pods={podList}
            displayTag={displayTag}
            podType={podType}
          />
        }
      </div>
    </>
  );
}
