import React, { useState, useContext } from "react";
import IEnablee from "../../models/interfaces/IEnablee";

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

export const ToggleDetailsContext = React.createContext < [IEnablee | null, (item: IEnablee | null) => void]>([
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
  const [details, setDetails] = useState<IEnablee | null>(null);

  const changeToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const changeToggleArrow = (arrow = false) => {
    setToggleArrow(arrow);
  };

  const setSideBarInfo = (item: IEnablee | null) => {
    // console.log(item)
    setDetails(item)
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
