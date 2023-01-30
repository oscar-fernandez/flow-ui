import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import IEnablee from "../../../models/interfaces/IEnablee";
import IPageOfItems from "../../../models/interfaces/IPageOfItems";

export const useAllEnablees = () => {
  const [enablees, setEnablees] = useState<IPageOfItems<IEnablee>>();

  const updateEnablees = (pageNumber: number) => {
    GetPaginatedEnablees(pageNumber).then((res) => {
      setEnablees(res.data);
    });
  };

  useEffect(() => {
    updateEnablees(0);
  }, []);

  return [enablees, updateEnablees];
};
