import "./PodPageContainer.css";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
//import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEPod from "../../models/interfaces/IFEPod";
import { Location, useLocation } from "react-router-dom";
import IDisplayTag from "../../models/interfaces/IDisplayTag";

interface Props {
  hook: (location: Location) => IFEPod[];
  displayTag: (pod: IFEPod) => IDisplayTag;
}
export default function PodPageContainer({ hook, displayTag }: Props) {
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
