import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import IEnabler from "../../models/interfaces/IEnabler";
import IFEEnabler from "../../models/interfaces/IFEEnabler";
import { buttonStyle } from "../EnableeTemplate/EnableeTemplate";

export default function EnablerTemplate() {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [feEnabler, setFEEnabler] = useState<IFEEnabler>();
  const [enabler, setEnabler] = useState<IEnabler>();

  // const handleActivePod=(pod id)=>{
  //     /*
  //         if a pod is checked

  //     */
  //    return null

  // }
  // const handlePendingPod=()=>{
  //     /*
  //         if a pod is checked

  //     */
  //    return null
  // }

  // useEffect(()=>{
  //     //check if any of the required fields are empty if so set disabled to true else set to false

  //     //if(){

  //     //setDisabledSubmit(true)
  //     //}
  //     //else{
  //     //setDisabledSubmit(false)
  //     //}
  // })
  // handleSubmit(){

  // }

  return (
    <>
      {
        //Insert ToggleGeneral Form
        //Cre
        //<ToogleGeneralForm enabler={enabler}

        ""
      }
      {/* enablerpodTemplate pods={activePod}  handleclick={handleActivePods}*/
      /* enablerpodTemplate pods={pendingsPod} handleclick={handlePendingPods}  */}
      {/* <Button sx={buttonStyle}
        variant={"contained"}
        disabled={disableSubmit}
        onClick={templateHandleSubmit}
        >Submit</Button>
    */}
    </>
  );
}
