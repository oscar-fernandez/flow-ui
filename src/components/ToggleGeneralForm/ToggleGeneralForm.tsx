import { SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./ToggleGeneralForm.css";
import { cities, countries, states } from "../../data/EnablerLocation";
import SelectDropdown from "../UtilFormComponents/SelectDropdown";
import IEnabler from "../../models/interfaces/IEnabler";
import InputContainer from "../UtilFormComponents/InputContainer";
import CheckboxContainer from "../UtilFormComponents/CheckboxContainer";
import TitleContainer from "../UtilFormComponents/TitleContainer";

export default function ToggleGeneralForm() {
  const [enabler, setEnabler] = useState<IEnabler>({
    employeeId: -1,
    firstName: "",
    lastName: "",
    assetTag: "",
    isEmployed: true,
    technology: [],
    city: "",
    state: "",
    country: "",
    communityId: -1,
    employmentTypeId: -1,
  });

  //Select Dropdown
  const cityChangeHandler = (e: SelectChangeEvent<string>) => {
    setEnabler({ ...enabler, city: e.target.value });
  };
  const stateChangeHandler = (e: SelectChangeEvent<string>) => {
    setEnabler({ ...enabler, state: e.target.value });
  };
  const countryChangeHandler = (e: SelectChangeEvent<string>) => {
    setEnabler({ ...enabler, country: e.target.value });
  };

  //Input
  // const firstNameChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler, firstName: e.target.value.split(" ")[0] });
  // };

  // const employeeIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler, employeeId: e.target.valueAsNumber });
  // };

  // const NameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = e.target.value.split(" ");
  //   setEnabler({ ...enabler, firstName: name[0] });
  //   setEnabler({ ...enabler, lastName: name[1] });
  // };

  // const lastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler, lastName: e.target.value.split(" ")[1] });
  // };
  // const assetTagChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler, assetTag: e.target.value });
  // };

  // const technologyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler,  technology: e.target.value });
  // };

  // const communityIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler, communityId: +e.target.value });
  // };

  // const employementTypeIdChangeHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setEnabler({ ...enabler, employmentTypeId: +e.target.value });
  // };

  // //CheckBox
  // const isEmployedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnabler({ ...enabler, isEmployed: e.target.checked });
  // };

  return (
    <>
      <form>
        <div className="employee-margin">
          <TitleContainer />
        </div>
        <div className="grid-container">
          <InputContainer
            type={"number"}
            label={"Employee Id"}
            required={true}
          />
          <SelectDropdown
            value={enabler.city}
            setValue={cityChangeHandler}
            selectArray={cities}
            label="City"
          />
          <SelectDropdown
            value={enabler.state}
            setValue={stateChangeHandler}
            selectArray={states}
            label="State"
          />
          <SelectDropdown
            value={enabler.country}
            setValue={countryChangeHandler}
            selectArray={countries}
            label="Country"
          />
          <InputContainer label={"Asset Tag"} />
          <InputContainer type={"number"} label={"Community"} />
          <InputContainer type={"number"} label={"Employment Type"} />
          <CheckboxContainer label={"Is Employed"} />
        </div>
      </form>
    </>
  );
}
