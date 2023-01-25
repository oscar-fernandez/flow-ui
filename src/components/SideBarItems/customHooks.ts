import { useState } from "react";
import { useNavigate } from "react-router";
import Toggle from "../../models/interfaces/Toggle";
export const useCustomNavigate = (routePath: string) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routePath);
  };
  return { handleNavigate };
};

export const useToggle = (intialToggleValue: boolean) => {
  const [toggle, setToggle] = useState(intialToggleValue);

  const handleClick = () => {
    setToggle(!toggle);
  };
  const toggleModel: Toggle = {
    toggle,
    handleClick,
  };
  return toggleModel;
};
