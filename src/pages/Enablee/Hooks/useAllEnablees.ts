import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import IEnablee from "../../../models/interfaces/IEnablee";
import IPageOfItems from "../../../models/interfaces/IPageOfItems";

export const useAllEnablees = () => {
  const [enablees, setEnablees] = useState<IPageOfItems<IEnablee> | null>(null);

  const updateEnablees = (pageNumber: number) => {
    GetPaginatedEnablees(pageNumber).then((res) => {
      setEnablees(res.data);
    });
  };

  useEffect(() => {
    updateEnablees(1);
  }, []);

  return { enablees, updateEnablees };
};
