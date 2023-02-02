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
  [any, (item: any) => void]
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

export function useToggleDetail() {
  return useContext(ToggleDetailsContext);
}

const ToggleProvider = ({ children }: ToggleBarProps) => {
  const [toggle, setToggle] = useState(false);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [detail, setDetail] = useState<any>(null);

  const changeToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const changeToggleArrow = (arrow = false) => {
    setToggleArrow(arrow);
  };
  const changeToggleDetail = (item: any) => {
    setDetail(item);
  };

  return (
    <ToggleContext.Provider value={[toggle, changeToggle]}>
      <ToggleArrowContext.Provider value={[toggleArrow, changeToggleArrow]}>
        <ToggleDetailsContext.Provider value={[detail, changeToggleDetail]}>
          {children}
        </ToggleDetailsContext.Provider>
      </ToggleArrowContext.Provider>
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
