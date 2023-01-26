import { useState, useEffect } from "react";
import IEnablee from "../../../models/interfaces/IEnablee";
import {
  GetEnableesPendingPodAssignment,
  GetEnableesWithNoStartDate,
} from "../../../services/EnableeAPI";

export const usePendingPodEnablees = () => {
  const [list, setList] = useState<IEnablee[]>([]);

  useEffect(() => {
    GetEnableesPendingPodAssignment().then((items) => {
      setList(items.data);
    });
  }, []);
  return [list, setList];
};

export const usePendingStartEnablees = () => {
  const [list, setList] = useState<IEnablee[]>([]);
  useEffect(() => {
    GetEnableesWithNoStartDate().then((enablees) => {
      setList(enablees.data);
    });
  }, []);
  return [list, setList];
};
