import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mockFePod } from "../../../data/MockFEPod";
import IFEPod from "../../../models/interfaces/IFEPod";
//import {getCompletedPods} from "../../../services/PodAPI"

export function useCompletedPods(): {
  podList: IFEPod[];
  setPodList: Dispatch<SetStateAction<IFEPod[]>>;
} {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    /* getCompletedPods().then((pods) => {
            setCompletedPods(pods.data);
        });  */
    setPodList(mockFePod);
  }, []);

  return { podList, setPodList };
}

export function useAvailablePods(): {
  podList: IFEPod[];
  setPodList: Dispatch<SetStateAction<IFEPod[]>>;
} {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    setPodList(mockFePod);
  }, []);

  return { podList, setPodList };
}
