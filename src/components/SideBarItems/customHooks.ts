import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

  return [toggle, handleClick];
};
