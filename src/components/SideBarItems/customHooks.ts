import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export const useCustomNavigate = (routePath: string) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routePath);
  };
  return { handleNavigate };
};
