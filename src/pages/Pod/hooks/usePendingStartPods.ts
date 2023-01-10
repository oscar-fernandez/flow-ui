import { useEffect, useState } from "react";
import IPod from "../../../models/interfaces/IPod";

export const usePendingStartPods = () => {
  const [pods, setPods] = useState<IPod[] | null>(null);

  const updatePods = () => {
    const newPods = apiCall();
    setPods(newPods);
  };

  useEffect(() => {
    updatePods();
  }, []);

  return [pods, updatePods];
};
