import { useState, useEffect } from "react";
import IEnablee from "../../../models/interfaces/IEnablee";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";

function usePendingPodEnablees() {
  const [receivedEnablees, setReceivedEnablees] = useState([]);

  const getEnablees = async () => {
    GetEnableesPendingPodAssignment().then((res) => {
      setReceivedEnablees(res.data);
    });
    // .catch((err) => {
    //   console.error(err);
    // });
    //possible refac https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
  };

  useEffect(() => {
    getEnablees();
  }, []);

  return { receivedEnablees, setReceivedEnablees };
}
export default usePendingPodEnablees;
