import { useEffect, useState } from "react";
import { mockFePod } from "../../../data/MockFEPod";
import IFEPod from "../../../models/interfaces/IFEPod";
//import {getCompletedPods} from "../../../services/PodAPI"

export const useCompletedPods = () => {
  const [completedPods, setCompletedPods] = useState<IFEPod[]>([]);

  useEffect(() => {
    /* getCompletedPods().then((pods) => {
            setCompletedPods(pods.data);
        });  */
    setCompletedPods(mockFePod);
  }, []);

  return { completedPods };
};

export function useAvailablePods() {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    setPodList(mockFePod);
  }, []);

  return [podList, setPodList];
}

export function useActivePods() {
  const [activePods, setActivePods] = useState<IFEPod[]>([]);

  useEffect(() => {
    mockFePod
      .filter(
        (pod) =>
          Date.parse(pod.podStartDate) <= Date.now() &&
          Date.parse(pod.podEndDate) >= Date.now()
      )
      .forEach((pod) => setActivePods((activePods) => [...activePods, pod]));
  }, []);

  return [activePods, setActivePods];
}
