import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import IEnabler from "../../models/interfaces/IEnabler";
import IFEEnabler from "../../models/interfaces/IFEEnabler";
import { buttonStyle } from "../EnableeTemplate/EnableeTemplate";
import ToggleGeneralForm from "../ToggleGeneralForm/ToggleGeneralForm";
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
