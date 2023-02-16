import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./ToggleGeneralForm.css";

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

const selectStyle = {
  color: "#8A8B8A",
  fontSize: "15px",
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
};

export default function ToggleGeneralForm() {
  const [city, setCity] = useState("");
  return (
    <>
      <div style={{ maxWidth: "430px" }}>
        <form>
          <TextField
            key="name"
            placeholder="Untitled"
            variant="standard"
            autoComplete="off"
            sx={titleProps}
            InputProps={InputProps}
            inputProps={{ "data-testid": "enableeName" }}
            //   error={name.trim().length === 0}
          />
          {/* {name.length === 0 ? (
          <div className="form-error">* Enablee Name required</div>
        ) : (
          <div className="dummy-padding"></div>
        )} */}

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
              {/* {employeeId.length === 0 ? (
              <div className="form-error">* Employee Id required</div>
            ) : null} */}
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
            <div>
              <FormControl sx={{ width: 120 }}>
                <Select
                  disableUnderline
                  variant="standard"
                  displayEmpty
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  inputProps={{ IconComponent: () => null }}
                  sx={selectStyle}
                >
                  <MenuItem disabled value="">
                    City
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Typography sx={labelStyle}>State</Typography>
            <Typography sx={labelStyle}>Country</Typography>
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
