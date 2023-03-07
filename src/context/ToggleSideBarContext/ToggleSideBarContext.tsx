import React, { useState, useContext } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import IFEPod from "../../models/interfaces/IFEPod";
import IFEEnabler from "../../models/interfaces/IFEEnabler";
import ITechnology from "../../models/interfaces/ITechnology";

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

export const ToggleTemplateContext = React.createContext<
  [React.ReactNode, (template: React.ReactNode) => void]
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

export const TogglePrevDetailsContext = React.createContext<
  [
    (IFEPod | IEnablee | IFEEnabler)[],
    (prevDetails: (IFEPod | IEnablee | IFEEnabler)[]) => void
  ]
>([
  [],
  () => {
    return;
  },
]);

export const ToggleSkillsContext = React.createContext<
  [ITechnology[], (techs: ITechnology[]) => void]
>([
  [],
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

export function useToggleTemplate() {
  return useContext(ToggleTemplateContext);
}

export function useTogglePrevDetails() {
  return useContext(TogglePrevDetailsContext);
}

export function useMapDetail() {
  return useContext(MapContext);
}

export function useToggleSkills() {
  return useContext(ToggleSkillsContext);
}

const ToggleProvider = ({ children }: ToggleBarProps) => {
  const [toggle, setToggle] = useState(false);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);
  const [template, setTemplate] = useState<React.ReactNode>(null);
  const [prevDetails, setPrevDetails] = useState<
    (IFEPod | IEnablee | IFEEnabler)[]
  >([]);

  const [allSkills, setAllSkills] = useState<ITechnology[]>([]);

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

  const changeToggleTemplate = (template: React.ReactNode) => {
    setTemplate(template);
  };

  const changePrevDetails = (details: (IFEPod | IEnablee | IFEEnabler)[]) => {
    setPrevDetails(details);
  };

  const changeSkills = (skills: ITechnology[]) => {
    setAllSkills(skills);
  };

  return (
    <MapContext.Provider value={[map, changeMapDetail]}>
      {/* Something probably broken below */}
      <ToggleSkillsContext.Provider value={[allSkills, changeSkills]}>
        <ToggleTemplateContext.Provider
          value={[template, changeToggleTemplate]}
        >
          <TogglePrevDetailsContext.Provider
            value={[prevDetails, changePrevDetails]}
          >
            <ToggleContext.Provider value={[toggle, changeToggle]}>
              <ToggleArrowContext.Provider
                value={[toggleArrow, changeToggleArrow]}
              >
                <ToggleDetailsContext.Provider
                  value={[detail, changeToggleDetail]}
                >
                  {children}
                </ToggleDetailsContext.Provider>
              </ToggleArrowContext.Provider>
            </ToggleContext.Provider>
          </TogglePrevDetailsContext.Provider>
        </ToggleTemplateContext.Provider>
      </ToggleSkillsContext.Provider>
    </MapContext.Provider>
  );
};

export default ToggleProvider;
