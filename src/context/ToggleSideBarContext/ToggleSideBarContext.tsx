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
export const DetailsContext = React.createContext<
  [IEnablee, (view: IEnablee) => void]
>([
  {} as IEnablee,
  () => {
    return;
  },
]);

export const LocationContext = React.createContext<
  [string, (locationString: string) => void]
>([
  "",
  () => {
    return;
  },
]);

export function useRouteLocation() {
  return useContext(LocationContext);
}

export function useToggle() {
  return useContext(ToggleContext);
}

export function useDetails() {
  return useContext(DetailsContext);
}

const ToggleProvider = ({ children }: ToggleBarProps) => {
  const [toggle, setToggle] = useState(false);
  const [template, setTemplate] = useState("");
  const [details, setDetails] = useState<IEnablee>({} as IEnablee);

  const changeToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const changeTemplate = (locString: string) => {
    if (locString == "enablee") {
      setTemplate("enableeTemplate");
    }
  };

  const changeDetails = (viewDetails: IEnablee) => {
    setDetails(viewDetails);
  };

  return (
    <DetailsContext.Provider value={[details, changeDetails]}>
      <LocationContext.Provider value={[template, changeTemplate]}>
        <ToggleContext.Provider value={[toggle, changeToggle]}>
          {children}
        </ToggleContext.Provider>
      </LocationContext.Provider>
    </DetailsContext.Provider>
  );
};

export default ToggleProvider;
