import { useEffect, useState } from "react";
import { mockFePod } from "../../../data/MockFEPod";
import IFEPod from "../../../models/interfaces/IFEPod";
import {
  getActivePods,
  getAvailablePods,
  getCompletedPods,
  getPendingPods,
} from "../../../services/PodAPI";

export function useCompletedPods() {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  const updatePods = () => {
    getCompletedPods().then((res) => {
      setPodList(res.data);
    });
  };

  useEffect(() => {
    updatePods();
  }, []);
  return podList;
}

export function useAvailablePods() {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  const updatePods = () => {
    getAvailablePods().then((res) => {
      setPodList(res.data);
    });
  };

  useEffect(() => {
    updatePods();
  }, []);

  return podList;
}

export function useActivePods() {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  const updatePods = () => {
    getActivePods().then((res) => {
      setPodList(res.data);
    });
  };

  useEffect(() => {
    updatePods();
  }, []);

  return podList;
}

export const usePendingStartPods = () => {
  const [podList, setPodList] = useState<IFEPod[]>([]);
  const updatePods = () => {
    getPendingPods().then((res) => {
      setPodList(res.data);
    });
  };

  useEffect(() => {
    updatePods();
  }, []);

  return podList;
};
