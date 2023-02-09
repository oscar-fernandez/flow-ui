import "./PodPageContainer.css";
import { GeneratePodRows } from "../../components/GeneratePodRows/GeneratePodRows";
import IFEPod from "../../models/interfaces/IFEPod";
import { Location, useLocation } from "react-router-dom";
import IDisplayTag from "../../models/interfaces/IDisplayTag";

interface Props {
  hook: (location: Location) => [IFEPod[], (list: IFEPod[]) => void];
  displayTag: (pod: IFEPod) => IDisplayTag;
}
export default function PodPageContainer({ hook, displayTag }: Props) {
  const location = useLocation();
  const [fetchedPods, updateFetchedHooks] = hook(location);
  const locationPath: string = location.pathname;
  const convertLocationToString = (path: string) => {
    switch (path) {
      case "/pod/active":
        return "Active";
      case "/pod/completed":
        return "Completed";
      case "/pod/pending":
        return "Pending";
      case "/pod/available":
        return "Available";
      case "/":
        return "unknown";
      default:
        return "default";
    }
  };

  return (
    <>
      <div data-testid="pageSectionTestId" className="page-section">
        <GeneratePodRows
          pods={[]}
          displayTag={displayTag}
          location={convertLocationToString(locationPath)}
        />
      </div>
    </>
  );
}
