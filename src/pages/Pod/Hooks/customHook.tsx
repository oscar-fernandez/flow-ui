import { useEffect, useState } from "react";
import IFEPod from "../../../models/interfaces/IFEPod";
import {
  getActivePods,
  getAvailablePods,
  getCompletedPods,
  getPendingPods,
  getPodById,
} from "../../../services/PodAPI";
import { Location } from "react-router-dom";
import { InferCustomEventPayload } from "vite";

export function useCompletedPods(
  location: Location
): [IFEPod[], (list: IFEPod[]) => void] {
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

export function useAvailablePods(
  location: Location
): [IFEPod[], (list: IFEPod[]) => void] {
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

export function useActivePods(
  location: Location
): [IFEPod[], (list: IFEPod[]) => void] {
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

export function usePendingStartPods(
  location: Location
): [IFEPod[], (list: IFEPod[]) => void] {
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
}

export function usePodById(
  location: Location
): [IFEPod, (fepod: IFEPod) => void] {
  const [pod, setPod] = useState<IFEPod>();
  const updatePod = (podId: number) => {
    getPodById(podId).then((res) => {
      setPod(res.data);
    });
  };

  const updatePodfunction = (fepod: IFEPod) => {
    setPod(fepod);
  };

  useEffect(() => {
    updatePod(0);
  }, [location]);

  return [pod, updatePodfunction];
}
