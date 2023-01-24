import { useState, useEffect } from "react";
import IEnablee from "../../../models/interfaces/IEnablee";
import {
  GetEnableesPendingPodAssignment,
  GetEnableesWithNoStartDate,
} from "../../../services/EnableeAPI";

export const usePendingPodEnablees = () => {
  const [receivedEnablees, setReceivedEnablees] = useState<IEnablee[]>();

  useEffect(() => {
    GetEnableesPendingPodAssignment().then((items) => {
      setReceivedEnablees(items.data);
    });
  }, []);

  return { receivedEnablees, setReceivedEnablees };
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
