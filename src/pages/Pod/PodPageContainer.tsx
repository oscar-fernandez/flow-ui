import "./PodPageContainer.css";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IFEPod from "../../models/interfaces/IFEPod";
import IDisplayTag from "../../models/interfaces/IDisplayTag";

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
