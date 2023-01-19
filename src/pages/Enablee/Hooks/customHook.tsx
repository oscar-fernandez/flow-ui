import { useState, useEffect } from "react";
import {
  GetEnableesPendingPodAssignment,
  GetEnableesWithNoStartDate,
} from "../../../services/EnableeAPI";

export const usePendingPodEnablees = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    GetEnableesPendingPodAssignment().then((items) => {
      setList(items.data);
    });
  }, []);
  return { list, setList };
};

export const usePendingStartEnablees = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    GetEnableesWithNoStartDate().then((enablees) => {
      setList(enablees.data);
    });
  }, []);
  return { list, setList };
};
