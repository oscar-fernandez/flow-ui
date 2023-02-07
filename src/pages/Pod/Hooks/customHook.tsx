import { useEffect, useState } from "react";
import IFEPod from "../../../models/interfaces/IFEPod";
import {
  getActivePods,
  getAvailablePods,
  getCompletedPods,
  getPendingPods,
} from "../../../services/PodAPI";
import { Location } from "react-router-dom";

export function useCompletedPods(location: Location) {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  const updatePods = () => {
    getCompletedPods().then((res) => {
      setPodList(res.data);
    });
  };

  const updatePodList = (list: IFEPod[]) => {
    setPodList(list);
  };

  useEffect(() => {
    updatePods();
  }, [location]);
  return [podList, updatePodList];
}

export function useAvailablePods(location: Location) {
  const [podList, setPodList] = useState<IFEPod[]>([]);
  const updatePods = () => {
    getAvailablePods().then((res) => {
      setPodList(res.data);
    });
  };

  const updatePodList = (list: IFEPod[]) => {
    setPodList(list);
  };

  useEffect(() => {
    updatePods();
  }, [location]);

  return [podList, updatePodList];
}

export function useActivePods(location: Location) {
  const [podList, setPodList] = useState<IFEPod[]>([]);
  const updatePods = () => {
    getActivePods().then((res) => {
      setPodList(res.data);
    });
  };

  const updatePodList = (list: IFEPod[]) => {
    setPodList(list);
  };

  useEffect(() => {
    updatePods();
  }, [location]);

  return [podList, updatePodList];
}

export const usePendingStartPods = (location: Location) => {
  const [podList, setPodList] = useState<IFEPod[]>([]);
  const updatePods = () => {
    getPendingPods().then((res) => {
      setPodList(res.data);
    });
  };

  const updatePodList = (list: IFEPod[]) => {
    setPodList(list);
  };

  useEffect(() => {
    updatePods();
  }, [location]);

  return [podList, updatePodList];
};
