import { useEffect, useState } from "react";

import IFEPod from "../../../models/interfaces/IFEPod";
import { mockFePod } from "../../../data/MockFEPod";

export function useAvailablePods() {
  const [podList, setPodList] = useState<IFEPod[]>([]);

  useEffect(() => {
    setPodList(mockFePod);
  }, []);

  return [podList, setPodList];
}
