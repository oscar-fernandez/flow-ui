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
import { mockFePod } from "../../../data/MockFEPod";

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
  podId: number,
  location: Location
): [IFEPod, (pod: IFEPod) => void] {
  const [pod, setPod] = useState<IFEPod>(Object);

  const getPod = (id: number) => {
    setPod(mockFePod[0]);
    // getPodById(id).then((res) => {
    //   setPod(res.data);
    // });
  };

  const updatePod = (pod: IFEPod) => {
    setPod(pod);
  };

  useEffect(() => {
    getPod(podId);
  }, [location]);

  return [pod, updatePod];
}
