import { useState, useEffect } from "react";
import { dummyEnablees } from "../../../data/EnableeMock";
import IEnablee from "../../../models/interfaces/IEnablee";
import IFEPod from "../../../models/interfaces/IFEPod";
import {
  GetEnableesPendingPodAssignment,
  GetEnableesWithNoStartDate,
} from "../../../services/EnableeAPI";
import { getAvailablePods } from "../../../services/PodAPI";

export const usePendingPodEnablees = () => {
  const [receivedEnablees, setReceivedEnablees] = useState<IEnablee[]>([]);

  useEffect(() => {
    GetEnableesPendingPodAssignment()
      .then((items) => {
        setReceivedEnablees([...items.data]);
      })
      .catch((e) => console.error(e));
  }, []);

  return { receivedEnablees, setReceivedEnablees };
};

export const usePendingStartEnablees = (location: string) => {
  const [list, setList] = useState<IEnablee[]>([]);
  useEffect(() => {
    GetEnableesWithNoStartDate().then((enablees) => {
      setList(enablees.data);
    });
  }, [location]);
  return [list, setList];
};

export function useHolderAvailablePods() {
  const [availablePods, setAvailablePods] = useState<IFEPod[]>([]);
  const updatePods = () => {
    getAvailablePods().then((res) => {
      setAvailablePods(res.data);
    });
  };

  useEffect(() => {
    updatePods();
  }, []);

  return { availablePods, setAvailablePods };
}
