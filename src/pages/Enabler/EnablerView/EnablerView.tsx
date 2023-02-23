import "./EnablerView.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router";
import { getActivePods, getPendingPods } from "../../../services/PodAPI";
import IFEPod from "../../../models/interfaces/IFEPod";
import { useEffect, useState } from "react";
import { useMapDetail } from "../../../context/ToggleSideBarContext/ToggleSideBarContext";

/**
 * This component is rendered as the parent route "/enabler"
 * @returns enabler view
 */
export default function EnablerView() {
  const [activePods, setActivePods] = useState<IFEPod[]>([]);
  const [pendingPods, setPendingPods] = useState<IFEPod[]>([]);
  const [map, setMap] = useMapDetail();

  const seedPodMap = (): Map<string, IFEPod[]> => {
    const podMap = new Map();

    getActivePods().then((res) => {
      setActivePods(res.data);
    });

    getPendingPods().then((res) => {
      setPendingPods(res.data);
    });

    podMap.set("Active", activePods);
    podMap.set("Pending", pendingPods);
    return podMap;
  };

  useEffect(() => {
    setMap(seedPodMap());
  }, [activePods, pendingPods]);

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
