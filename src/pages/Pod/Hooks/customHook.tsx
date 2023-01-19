import axios from "axios";
import React, { useEffect, useState } from "react";
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
