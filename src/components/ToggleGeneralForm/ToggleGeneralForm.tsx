import { SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./ToggleGeneralForm.css";
import { cities, countries, states } from "../../data/EnablerLocation";
import SelectDropdown from "../UtilFormComponents/SelectDropdown";

import InputContainer from "../UtilFormComponents/InputContainer";
import CheckboxContainer from "../UtilFormComponents/CheckboxContainer";
import NameTitleContainer from "../UtilFormComponents/NameTitleContainer";
import ITechnology from "../../models/interfaces/ITechnology";
import {
  useToggle,
  useToggleDetail,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { isIFEEnabler } from "../../utils/utilityFunctions";
import IFEEnabler from "../../models/interfaces/IFEEnabler";
import IEnablee from "../../models/interfaces/IEnablee";
import { TagComponent } from "../TagComponent/Tag";
import { SkillListComponent } from "../SkillListComponent/SkillListComponent";

export default function ToggleGeneralForm() {
  const labelStyle = {
    fontFamily: "Darker Grotesque",
    fontWeight: 600,
    color: "#8A8B8A",
    fontSize: "15px",
    letterSpacing: "0.025em",
    width: "90px",
  };

  const [detail, setDetail] = useToggleDetail();
  const [toggle, changeToggle] = useToggle();
  const [formEnabler, setEnabler] = useState<IFEEnabler>({
    employeeId: -1,
    firstName: "",
    lastName: "",
    assetTag: "",
    employed: true,
    technology: [],
    city: "",
    state: "",
    country: "",
    communityId: -1,
    employmentTypeId: -1,
    numActivePods: [],
    numPendingPods: [],
  });

  useEffect(() => {
    if (detail && isIFEEnabler(detail)) {
      setEnabler(detail);
    }
  }, []);

  //Select Dropdown
  const cityChangeHandler = (e: SelectChangeEvent<string>) => {
    setEnabler({ ...formEnabler, city: e.target.value });
  };
  const stateChangeHandler = (e: SelectChangeEvent<string>) => {
    setEnabler({ ...formEnabler, state: e.target.value });
  };
  const countryChangeHandler = (e: SelectChangeEvent<string>) => {
    setEnabler({ ...formEnabler, country: e.target.value });
  };

  //Input
  // const firstNameChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...formEnabler, firstName: e.target.value.split(" ")[0] });
  // };

  const employeeIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabler({ ...formEnabler, employeeId: e.target.valueAsNumber });
  };

  // const NameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //    const name = e.target.value.split(" ");
  //    setEnabler({ ...formEnabler, firstName: name[0] });
  //    setEnabler({ ...formEnabler, lastName: name[1] });
  //  };

  // const lastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...formEnabler, lastName: e.target.value.split(" ")[1] });
  // };
  const assetTagChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabler({ ...formEnabler, assetTag: e.target.value });
  };

  // const technologyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...formEnabler,  technology: e.target.value });
  // };

  const communityIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabler({ ...formEnabler, communityId: +e.target.value });
  };

  const employementTypeIdChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnabler({ ...formEnabler, employmentTypeId: +e.target.value });
  };

  // //CheckBox
  const isEmployedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabler({ ...formEnabler, employed: e.target.checked });
  };

  return (
    <>
      <form>
        <div className="employee-margin" data-testid="enabler-firstName">
          <NameTitleContainer
            firstName={formEnabler.firstName}
            lastName={formEnabler.lastName}
          />
        </div>
        <div className="grid-container">
          <InputContainer
            type={"number"}
            label={"Employee Id"}
            required={true}
            value={formEnabler.employeeId}
            onChange={employeeIdChangeHandler}
          />
          <SelectDropdown
            value={formEnabler.city}
            setValue={cityChangeHandler}
            selectArray={cities}
            label="City"
          />
          <SelectDropdown
            value={formEnabler.state}
            setValue={stateChangeHandler}
            selectArray={states}
            label="State"
          />
          <SelectDropdown
            value={formEnabler.country}
            setValue={countryChangeHandler}
            selectArray={countries}
            label="Country"
          />
          <InputContainer
            label={"Asset Tag"}
            value={formEnabler.assetTag}
            onChange={assetTagChangeHandler}
          />
          <InputContainer
            type={"number"}
            label={"Community"}
            value={formEnabler.communityId}
            onChange={communityIdChangeHandler}
          />
          <InputContainer
            type={"number"}
            label={"Employment Type"}
            value={formEnabler.employmentTypeId}
            onChange={employementTypeIdChangeHandler}
          />
          <CheckboxContainer
            label={"Is Employed"}
            value={formEnabler.employed}
            onChange={isEmployedChangeHandler}
          />
          <SkillListComponent allSkills={formEnabler.technology} />
        </div>
      </form>
    </>
  );
}
