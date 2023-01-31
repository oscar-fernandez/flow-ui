import "./PodPageContainer.css";
import PageNumberCarousel from "../../components/PageNumberCarousel/PageNumberCarousel";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
//import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IFEPod from "../../models/interfaces/IFEPod";
import IDisplayTag from "../../models/interfaces/IDisplayTag";
import { Location, useLocation } from "react-router-dom";

interface Props {
  hook: (location: Location) => IFEPod[];
  displayPageCarousel: boolean;
  displayTag: (pod: IFEPod) => IDisplayTag;
}
export default function PodPageContainer({
  hook,
  displayPageCarousel,
  displayTag,
}: Props) {
  const location = useLocation();
  const fetchedPods = hook(location);

  return (
    <>
      <div data-testid="pageSectionTestId" className="page-section">
        <GeneratePodRows
          pageNum={0}
          pods={fetchedPods}
          displayTag={displayTag}
        />
      </div>
    </>
  );
}
