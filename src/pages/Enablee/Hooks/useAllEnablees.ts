import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import IEnablee from "../../../models/interfaces/IEnablee";
import IPageOfItems from "../../../models/interfaces/IPageOfItems";

export const useAllEnablees = () => {
  const [enablees, setEnablees] = useState<IPageOfItems<IEnablee> | null>(null);

  const updateEnablees = () => {
    //page number is hardcoded but will be updated to a variable
    GetPaginatedEnablees(1).then((list) => {
      setEnablees(list.data);
    });
  };

  useEffect(() => {
    updateEnablees();
  }, []);

  return [enablees, updateEnablees];
};
