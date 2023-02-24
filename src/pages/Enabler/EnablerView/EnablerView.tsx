import "./EnablerView.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet, useLocation } from "react-router";
import IFEPod from "../../../models/interfaces/IFEPod";
import { useEffect } from "react";
import { useMapDetail } from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { useActivePods, usePendingStartPods } from "../../Pod/Hooks/customHook";
import ToggleSidebar from "../../../components/ToggleSideBar/ToggleSidebar";
import EnablerTemplate from "../../../components/EnablerTemplate/EnablerTemplate";

/**
 * This component is rendered as the parent route "/enabler"
 * @returns enabler view
 */
export default function EnablerView() {
  const location = useLocation();
  const [activePods, setActivePods] = useActivePods(location);
  const [pendingPods, setPendingPods] = usePendingStartPods(location);
  const [map, setMap] = useMapDetail();

  const seedPodMap = (): Map<string, IFEPod[]> => {
    const podMap = new Map();
    podMap.set("Active", activePods);
    podMap.set("Pending", pendingPods);
    return podMap;
  };

  useEffect(() => {
    setMap(seedPodMap());
  }, [activePods, pendingPods, location]);

  return (
    <>
      <div className="page-section">
        <PageViewHeader
          pageTitle="Enablers"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        />
      </div>
      <Outlet />
    </>
  );
}
