import React, { useState, useContext } from "react";
import IEnablee from "../models/interfaces/IEnablee";

interface ToggleBarProps {
  children: JSX.Element;
}

export const defaultEnablee: IEnablee = {
  employeeId: 1,
  firstName: "Default",
  lastName: "Default",
  dateOfJoin: new Date(),
  enablementStartDate: new Date(),
  enablementEndDate: new Date(),
  assetTag: "",
  isEmployed: false,
  technology: [{ id: 0, name: "Default" }],
  countryCode: 0,
  gradeId: 0,
  communityId: 0,
  employementTypeId: 0,
  podId: 0,
  commentId: [],
};

export interface IToggleContext {
  toggle: boolean;
  changeToggle: () => void;
}

export interface IDetailsContext {
  details: IEnablee;
  changeDetails: (view: IEnablee) => void;
}

export const ToggleContext = React.createContext<IToggleContext | null>(null);
export const DetailsContext = React.createContext<IDetailsContext | null>(null);

export function useToggle() {
  return useContext(ToggleContext);
}

export function useDetails() {
  return useContext(DetailsContext);
}

const ToggleProvider = ({ children }: ToggleBarProps) => {
  const [toggle, setToggle] = useState(false);
  const [details, setDetails] = useState<IEnablee>(defaultEnablee);

  const changeToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const changeDetails = (viewDetails: IEnablee) => {
    setDetails(viewDetails);
  };

  return (
    <DetailsContext.Provider value={{ details, changeDetails }}>
      <ToggleContext.Provider value={{ toggle, changeToggle }}>
        {children}
      </ToggleContext.Provider>
    </DetailsContext.Provider>
  );
};

export default ToggleProvider;
