import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./ToggleGeneralForm.css";
import { cities, countries, states } from "../../data/EnablerLocation";
import SelectDropdown from "./SelectDropdown";

const InputProps = {
  disableUnderline: true,
};

const titleProps = {
  input: {
    fontFamily: "Darker Grotesque",
    fontSize: "32px",
    color: "#000048",
    fontWeight: 700,
    letterSpacing: "0.025em",
    "&::placeholder": {
      color: "#8A8B8A",
    },
  },
};

const labelStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
  color: "rgba(138, 139, 138, 0.8)",
  fontSize: "15px",
  letterSpacing: "0.025em",
  width: "90px",
};

const inputStyle = {
  input: {
    fontFamily: "Darker Grotesque",
    fontWeight: "600",
    color: "#8A8B8A",
    fontSize: "15px",
    letterSpacing: "0.025em",
  },
};

export default function ToggleGeneralForm() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  return (
    <>
      <div style={{ maxWidth: "430px" }}>
        <form>
          <div className="employee-margin">
            <TextField
              key="name"
              placeholder="Untitled"
              variant="standard"
              autoComplete="off"
              sx={titleProps}
              InputProps={InputProps}
              inputProps={{ "data-testid": "enableeName" }}
            />
          </div>
          <div className="grid-container">
            <Typography sx={labelStyle}>Employee Id</Typography>
            <div className="id-wrap">
              <TextField
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                InputProps={InputProps}
                sx={inputStyle}
                inputProps={{ "data-testid": "employeeId" }}
              />
            </div>
            <Typography sx={labelStyle}>Asset Tag</Typography>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              inputProps={{ "data-testid": "assetTag" }}
            />
            <Typography sx={labelStyle}>City</Typography>
            <SelectDropdown
              value={city}
              setValue={(e) => setCity(e.target.value)}
              selectArray={cities}
              label="City"
            />
            <Typography sx={labelStyle}>State</Typography>
            <SelectDropdown
              value={state}
              setValue={(e) => setState(e.target.value)}
              selectArray={states}
              label="State"
            />
            <Typography sx={labelStyle}>Country</Typography>
            <SelectDropdown
              value={country}
              setValue={(e) => setCountry(e.target.value)}
              selectArray={countries}
              label="Country"
            />
            <Typography sx={labelStyle}>Community</Typography>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              inputProps={{ "data-testid": "community" }}
            />
            <Typography sx={labelStyle}>Employment Type</Typography>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              inputProps={{ "data-testid": "employmentType" }}
            />
            <Typography sx={labelStyle}>Is Employed?</Typography>
            <div>
              <input type="checkbox" data-testid="isEmployed"></input>
            </div>
            <Typography sx={labelStyle}>Grade</Typography>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              inputProps={{ "data-testid": "grade" }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
