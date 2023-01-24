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
  displayTag: ((pod: IFEPod) => IDisplayTag) | null;
}
export default function PodPageContainer({
  hook,
  title,
  displayPageCarousel,
  displayTag,
}: Props) {
  // const [pageNum, setPageNum] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  /* useEffect(() => {
    getTotalPages();
  }, []);

  const getTotalPages = async () => {
    GetPaginatedEnablees(0)
      .then((res) => {
       
        setTotalPages(Math.ceil(res.data.totalElements / 25));
      })
      .catch((e) => console.error(e));
  };  */

  const { podList, setPodList } = hook();

  /*const GetPods = async () => {
    const pods = await hook();
    console.log("IN get Pods " + JSON.stringify(pods));
    return pods;
  };  */

  return (
    <>
      <div className="page-section">
        <PageViewHeader pageTitle={title} showPlus={true} />
        {<GeneratePodRows pageNum={0} pods={podList} displayTag={displayTag} />}
      </div>
    </>
  );
}
