import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import IEnabler from "../../models/interfaces/IEnabler";
import IFEEnabler from "../../models/interfaces/IFEEnabler";
import { buttonStyle } from "../EnableeTemplate/EnableeTemplate";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { TogglePodContainer } from "../PodContainer/TogglePodContainer";
import ToggleGeneralForm from "../ToggleGeneralForm/ToggleGeneralForm";
// import { TogglePodContainer } from "../TogglePodContainer/TogglePodContainer";

import "./EnablerTemplate.css";
export default function EnablerTemplate() {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [feEnabler, setFEEnabler] = useState<IFEEnabler>();
  const [enabler, setEnabler] = useState<IEnabler>();

  return (
    <>
      <div className="form-container">
        <ToggleGeneralForm></ToggleGeneralForm>
      </div>
      {/* <div className="ActivePodContainer">
        <TogglePodContainer title={"Active Pods"} infoString={"Displays Enablee: Enabler Ratio and Progress"}/>
      </div> */}

      <div className="Active">
        <TogglePodContainer title="Active Pods" />
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
