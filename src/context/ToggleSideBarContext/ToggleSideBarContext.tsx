import React, { useState, useContext } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";
import IFEEnabler from "../../models/interfaces/IFEEnabler";

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
  [
    IEnablee | IFEPod | IFEEnabler | null,
    (item: IEnablee | IFEPod | IFEEnabler | null) => void
  ]
>([
  null,
  () => {
    return;
  },
]);

export const MapContext = React.createContext<
  [Map<string, IFEPod[]> | null, (item: Map<string, IFEPod[]> | null) => void]
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

export function useMapDetail() {
  return useContext(MapContext);
}

const ToggleProvider = ({ children }: ToggleBarProps) => {
  const [toggle, setToggle] = useState(false);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [map, setMap] = useState<any>(null);
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

  const changeMapDetail = (item: any) => {
    setMap(item);
  };

  const setSideBarInfo = (item: IEnablee | IFEPod | null) => {
    setDetail(item);
  };

  return (
    <MapContext.Provider value={[map, changeMapDetail]}>
      <ToggleContext.Provider value={[toggle, changeToggle]}>
        <ToggleArrowContext.Provider value={[toggleArrow, changeToggleArrow]}>
          <ToggleDetailsContext.Provider value={[detail, changeToggleDetail]}>
            {children}
          </ToggleDetailsContext.Provider>
        </ToggleArrowContext.Provider>
      </ToggleContext.Provider>
    </MapContext.Provider>
  );
};

export default ToggleProvider;
