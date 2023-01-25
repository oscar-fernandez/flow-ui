import "./PodPageContainer.css";
import PageNumberCarousel from "../../components/PageNumberCarousel/PageNumberCarousel";
import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
//import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IFEPod from "../../models/interfaces/IFEPod";
import IDisplayTag from "../../models/interfaces/IDisplayTag";

interface Props {
  hook: () => {
    podList: IFEPod[];
    setPodList: Dispatch<SetStateAction<IFEPod[]>>;
  };
  title: string;
  displayPageCarousel: boolean;
  displayTag: (pod: IFEPod) => IDisplayTag;
}
export default function PodPageContainer({
  hook,
  title,
  displayPageCarousel,
  displayTag,
}: Props) {
  const { podList, setPodList } = hook();

  return (
    <>
      <div data-testid="pageSectionTestId" className="page-section">
        <PageViewHeader
          data-testid={"podPageViewHeader"}
          pageTitle={title}
          showPlus={true}
        />
        {<GeneratePodRows pageNum={0} pods={podList} displayTag={displayTag} />}
      </div>
    </>
  );
}
