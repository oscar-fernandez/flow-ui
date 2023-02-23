import { useEffect, useState } from "react";
import IFEEnabler from "../../../models/interfaces/IFEEnabler";
import { getAllEnablers } from "../../../services/EnablerAPI";

/**
 * Hook that is used to fetch all the Enablers from the backend via API calls
 * @param location API url
 * @returns array of enablers
 */
export const GetAllEnablersHook = (location: string) => {
  const [allEnablers, updateAllEnablers] = useState<IFEEnabler[]>([]);
  useEffect(() => {
    getAllEnablers().then((enablers) => {
      updateAllEnablers(enablers.data);
    });
  }, [location]);
  return [allEnablers, updateAllEnablers];
};
