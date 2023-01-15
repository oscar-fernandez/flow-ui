import { Button, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import "./EnableeTemplate.css";
import { mockTechnology } from "../../data/MockData";
import { TagComponent } from "../TagComponent/Tag";

const InputProps = {
  disableUnderline: true,
};

const inputStyle = {
  input: {
    color: "#8A8B8A",
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
  //  const [enablementDates, setEnablementDates] = useState(""); // string?
  const [employeeId, setEmployeeId] = useState(""); // string or num ?
  //  const [dateOfJoin, setDateOfJoin] = useState(""); // string?
  const [assetTag, setAssetTag] = useState("");
  const [country, setCountry] = useState(""); // num?
  const [community, setCommunity] = useState(""); // num?
  const [employmentType, setEmploymentType] = useState(""); // num?
  const [isEmployed, setIsEmployed] = useState(false);
  const [grade, setGrade] = useState(""); // num?

  return (
    <>
      <div className="enablee-container">
        <form>
          <TextField
            value={name}
            placeholder="empty"
            variant="standard"
            autoComplete="off"
            InputProps={titleProps}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ "data-testid": "enableeName" }}
            error={name.length === 0}
            helperText={name.length === 0 ? "* Enablee Name required" : " "}
          />
          <div className="grid-container">
            <p className="text">Enablement Dates</p>
            <DatepickerComponent />
            <p className="text">Employee Id</p>
            <TextField
              value={employeeId}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setEmployeeId(e.target.value)}
              error={employeeId.length === 0}
              helperText={
                employeeId.trim().length === 0 ? "* Id required" : " "
              }
              inputProps={{ "data-testid": "employeeId" }}
            />
            <p className="text">Date of Join</p>
            <DatepickerComponent />
            <p className="text">Asset Tag</p>
            <TextField
              value={assetTag}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setAssetTag(e.target.value)}
              inputProps={{ "data-testid": "assetTag" }}
              error={assetTag.trim().length === 0}
              helperText={
                assetTag.trim().length === 0 ? "* Asset Tag required" : " "
              }
            />
            <p className="text">Country</p>
            <TextField
              value={country}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setCountry(e.target.value)}
              inputProps={{ "data-testid": "country" }}
              error={country.trim().length === 0}
              helperText={
                country.trim().length === 0 ? "* Country required" : " "
              }
            />
            <p className="text">Community</p>
            <TextField
              value={community}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setCommunity(e.target.value)}
              error={community.trim().length === 0}
              helperText={
                community.trim().length === 0 ? "* Community required" : " "
              }
              inputProps={{ "data-testid": "community" }}
            />
            <p className="text">Employment Type</p>
            <TextField
              value={employmentType}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setEmploymentType(e.target.value)}
              error={employmentType.trim().length === 0}
              inputProps={{ "data-testid": "employmentType" }}
              helperText={
                employmentType.trim().length === 0
                  ? "* Employment Type required"
                  : " "
              }
            />
            <p className="text">Is Employed?</p>
            <div>
              <Checkbox
                size="small"
                checked={isEmployed}
                inputProps={{ "aria-label": "isEmployed" }}
                onChange={(e) => setIsEmployed(e.target.checked)}
                sx={{
                  "&.Mui-checked": {
                    color: "#000048;",
                  },
                }}
              />
            </div>
            <p className="text">Grade</p>
            <TextField
              value={grade}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setGrade(e.target.value)}
              error={grade.trim().length === 0}
              inputProps={{ "data-testid": "grade" }}
              helperText={grade.trim().length === 0 ? "* Grade required" : " "}
            />
            <p className="text">Tech Stack</p>
            <div>
              <div>
                {mockTechnology.map((tech) => (
                  <TagComponent
                    name={tech.name}
                    color={tech.backgroundColor}
                    key={tech.name}
                  />
                ))}
              </div>
            </div>
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
