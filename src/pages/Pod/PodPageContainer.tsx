import "./PodPageContainer.css";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
//import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEPod from "../../models/interfaces/IFEPod";
import { generatePodTags } from "../../utils/utilityFunctions";
import { Location, useLocation } from "react-router-dom";

interface Props {
  hook: (location: Location) => IFEPod[];
}
export default function PodPageContainer({ hook }: Props) {
  const location = useLocation();
  const fetchedPods = hook(location);

  return (
    <>
      <div data-testid="pageSectionTestId" className="page-section">
        <GeneratePodRows
          pageNum={0}
          pods={fetchedPods}
          displayTag={generatePodTags}
        />
      </div>
    </>
  );
}
