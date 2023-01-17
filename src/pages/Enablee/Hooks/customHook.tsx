import { useState, useEffect } from "react";
import {
  GetEnableesPendingPodAssignment,
  GetEnableesWithNoStartDate,
} from "../../../services/EnableeAPI";

function usePendingPodEnablees() {
  const [list, setList] = useState([]);

  useEffect(() => {
    GetEnableesPendingPodAssignment().then((items) => {
      setList(items.data);
    });
  }, []);
  return { list, setList };
}

function usePendingStartEnablees() {
  const [list, setList] = useState([]);
  useEffect(() => {
    GetEnableesWithNoStartDate().then((enablees) => {
      setList(enablees.data);
    });
  }, []);
  return { list, setList };
}

export { usePendingPodEnablees, usePendingStartEnablees };
