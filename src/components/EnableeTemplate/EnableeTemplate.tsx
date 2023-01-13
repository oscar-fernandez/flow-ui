import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import "./EnableeTemplate.css";

const InputProps = {
  disableUnderline: true,
};

const inputStyle = {
  input: {
    color: "#8A8B8A",
    "&:invalid": {
      color: "red",
    },
  },
};

const titleProps = {
  disableUnderline: true,
  style: {
    fontSize: "32px",
    color: "#000048",
    fontWeight: 700,
  },
};

const buttonStyle = {
  backgroundColor: "#DC8D0B",
  fontFamily: "Darker Grotesque",
  fontWeight: 700,
  fontSize: "15px",
  letterSpacing: "0.025em",
  padding: ".3rem 1.25rem",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "5px",
  "&:hover": {
    color: "##F8E8CE",
    backgroundColor: "#DC8D0B",
    boxShadow: "none",
  },
};

export default function EnableeTemplate() {
  const [name, setName] = useState("");
  const [enablementDates, setEnablementDates] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [assetTag, setAssetTag] = useState("");
  const [country, setCountry] = useState("");
  const [community, setCommunity] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  // const [community, setCommunity] = useState("");
  const [isEmployed, setIsEmployed] = useState(true);
  const [grade, setGrade] = useState("");

  return (
    <>
      <div className="enablee-container">
        <form>
          <TextField
            value={name}
            placeholder="Empty"
            variant="standard"
            autoComplete="off"
            InputProps={titleProps}
            onChange={(e) => setName(e.target.value)}
            error={name.length === 0}
            helperText={name.length === 0 ? "* Enablee Name required" : " "}
          />
          <div className="grid-container">
            <p className="text">Enablement Dates</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Dates required" : " "}
            />
            <p className="text">Employee Id</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Id required" : " "}
            />
            <p className="text">Date of Join</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Date of Join required" : " "}
            />
            <p className="text">Asset Tag</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Asset Tag required" : " "}
            />
            <p className="text">Country</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Country required" : " "}
            />
            <p className="text">Community</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Country required" : " "}
            />
            <p className="text">Employment Type</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={
                name.length === 0 ? "* Employment Type required" : " "
              }
            />
            <p className="text">Community</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Community required" : " "}
            />
            <p className="text">Is Employed?</p>
            <div>
              <input type="checkbox" className="check-box"></input>
            </div>
            <p className="text">Grade</p>
            <TextField
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setName(e.target.value)}
              error={name.length === 0}
              helperText={name.length === 0 ? "* Grade required" : " "}
            />
          </div>
          <div className="button-center">
            <Button variant="contained" sx={buttonStyle}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
