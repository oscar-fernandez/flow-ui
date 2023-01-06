import { useState, useEffect } from "react";
import { GetEnableesPendingPodAssignment } from "../../services/EnableeAPI";

function usePendingPodEnablees() {
  const [list, setList] = useState([]);

  useEffect(() => {
    GetEnableesPendingPodAssignment().then((items) => {
      setList(items.data);
    });
  }, []);
  return { list, setList };
}

export default usePendingPodEnablees;
