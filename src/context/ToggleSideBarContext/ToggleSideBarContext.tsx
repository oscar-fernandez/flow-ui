import React, { useState, useContext } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";

interface ToggleBarProps {
  children: JSX.Element;
}

export const ToggleContext = React.createContext<[boolean, () => void]>([
  false,
  () => {
    return;
  },
]);

export const ToggleArrowContext = React.createContext<
  [boolean, (arrow: boolean) => void]
>([
  false,
  () => {
    return;
  },
]);

export const ToggleDetailsContext = React.createContext<
  [IEnablee | IFEPod | null, (item: IEnablee | IFEPod | null) => void]
>([
  null,
  () => {
    return;
  },
]);

export function useToggle() {
  return useContext(ToggleContext);
}

export function useToggleArrow() {
  return useContext(ToggleArrowContext);
}

export function useToggleDetails() {
  return useContext(ToggleDetailsContext);
}

const ToggleProvider = ({ children }: ToggleBarProps) => {
  const [toggle, setToggle] = useState(false);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [details, setDetails] = useState<IEnablee | IFEPod | null>(null);

  const changeToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const changeToggleArrow = (arrow = false) => {
    setToggleArrow(arrow);
  };

  const setSideBarInfo = (item: IEnablee | IFEPod | null) => {
    setDetails(item);
  };

  return (
    <ToggleContext.Provider value={[toggle, changeToggle]}>
      <ToggleArrowContext.Provider value={[toggleArrow, changeToggleArrow]}>
        <ToggleDetailsContext.Provider value={[details, setSideBarInfo]}>
          {children}
        </ToggleDetailsContext.Provider>
      </ToggleArrowContext.Provider>
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
