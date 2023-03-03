import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { buttonStyle } from "../EnableeTemplate/EnableeTemplate";
import { TogglePodContainer } from "../PodContainer/TogglePodContainer";
import ToggleGeneralForm from "../ToggleGeneralForm/ToggleGeneralForm";

import "./EnablerTemplate.css";
export default function EnablerTemplate() {
  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <>
      <div className="form-container">
        <ToggleGeneralForm></ToggleGeneralForm>
      </div>

      <div className="Active podContainer">
        <TogglePodContainer
          title="Active Pods"
          infoString="Displays Enablee : Enabler Ratio and Progress"
        />
      </div>
      <div className="Upcoming podContainer">
        <TogglePodContainer
          title="Upcoming Pods"
          infoString="Displays Enablee : Enabler Ratio and Start"
        />
      </div>

      <div className="button-center">
        <Button
          sx={buttonStyle}
          variant={"contained"}
          disabled={disableSubmit}
          //onClick={templateHandleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
