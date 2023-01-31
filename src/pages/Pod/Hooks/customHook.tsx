import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mockFePod } from "../../../data/MockFEPod";
import IFEPod from "../../../models/interfaces/IFEPod";
import {
  getActivePods,
  getAvailablePods,
  getCompletedPods,
  getPendingPods,
} from "../../../services/PodAPI";

export function useCompletedPods(): {
  podList: IFEPod[];
  setPodList: Dispatch<SetStateAction<IFEPod[]>>;
} {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    getCompletedPods().then((pods) => {
      setPodList(pods.data);
    });
  }, [podList, setPodList]);
  return { podList, setPodList };
}

export function useAvailablePods(): {
  podList: IFEPod[];
  setPodList: Dispatch<SetStateAction<IFEPod[]>>;
} {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    getAvailablePods().then((pods) => {
      setPodList(pods.data);
    });
  }, [podList, setPodList]);

  return { podList, setPodList };
}

export function useActivePods(): {
  podList: IFEPod[];
  setPodList: Dispatch<SetStateAction<IFEPod[]>>;
} {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    getActivePods().then((pods) => {
      setPodList(pods.data);
    });
  }, [podList, setPodList]);

  return { podList, setPodList };
}

export const usePendingStartPods = () => {
  const [pendingStartPods, setPendingStartPods] = useState<IFEPod[]>();
  const updatePendingStartPods = () => {
    getPendingPods().then((res) => {
      setPendingStartPods(res.data);
    });
  };

  useEffect(() => {
    updatePendingStartPods();
  }, []);

  return { pendingStartPods, updatePendingStartPods };
};
