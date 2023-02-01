import { useState, useEffect } from "react";
import { dummyEnablees } from "../../../data/EnableeMock";
import IEnablee from "../../../models/interfaces/IEnablee";
import {
  GetEnableesPendingPodAssignment,
  GetEnableesWithNoStartDate,
} from "../../../services/EnableeAPI";

export const usePendingPodEnablees = () => {
  const [receivedEnablees, setReceivedEnablees] = useState<IEnablee[]>([]);

  useEffect(() => {
    GetEnableesPendingPodAssignment()
      .then((items) => {
        setReceivedEnablees([
          ...items.data,
          dummyEnablees[0],
          dummyEnablees[1],
        ]);
      })
      .catch((e) => console.error(e));
  }, []);

  return { receivedEnablees, setReceivedEnablees };
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
