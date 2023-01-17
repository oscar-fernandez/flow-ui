import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import "./EnableeTemplate.css";
import { mockTechnology } from "../../data/MockData";
import { TagComponent } from "../TagComponent/Tag";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";

const InputProps = {
  disableUnderline: false,
};

const inputStyle = {
  input: {
    fontFamily: "Darker Grotesque",
    "&::placeholder": {
      fontWeight: "600",
      fontSize: "15px",
      color: "#8A8B8A",
      letterSpacing: "0.025em",
    },
  },
};

const titleProps = {
  marginBottom: "1rem",
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

const labelStyle = {
  color: "#8A8B8A",
  fontSize: "15px",
  letterSpacing: "0.025em",
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
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
  const [disableSubmit, setDisableSubmit] = useState(true);

  //method to check if all fields are valid
  useEffect(() => {
    if (
      name === "" ||
      employeeId === "" ||
      assetTag === "" ||
      country === "" ||
      community === "" ||
      employmentType === "" ||
      grade === ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  });

  return (
    <>
      <div className="enablee-container">
        <div className="close-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4"
            stroke="#DC8D0B"
            height={32}
            width={32}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <form>
          <TextField
            value={name}
            placeholder="empty"
            variant="standard"
            autoComplete="off"
            sx={titleProps}
            InputProps={InputProps}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ "data-testid": "enableeName" }}
            error={name.length === 0}
            helperText={name.length === 0 ? "* Enablee Name required" : " "}
          />
          <div className="grid-container">
            <Typography sx={labelStyle}>Enablement Dates</Typography>
            <DatepickerComponent />
            <Typography sx={labelStyle}>Employee Id</Typography>
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
            <Typography sx={labelStyle}>Date of Join</Typography>
            <DatepickerComponent />
            <Typography sx={labelStyle}>Asset Tag</Typography>
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
            <Typography sx={labelStyle}>Country</Typography>
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
            <Typography sx={labelStyle}>Community</Typography>
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
            <Typography sx={labelStyle}>Employment Type</Typography>
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
            <Typography sx={labelStyle}>Is Employed?</Typography>
            <div>
              <input
                type="checkbox"
                checked={isEmployed}
                onChange={(e) => setIsEmployed(e.target.checked)}
                data-testid="isEmployed"
              ></input>
            </div>
            <Typography sx={labelStyle}>Grade</Typography>
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
            <Typography sx={labelStyle}>Tech Stack</Typography>
            <div>
              <div className="test">
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
          <PageViewHeader pageTitle={"Pod"} showPlus={true} />
          <PageViewHeader pageTitle={"Comments"} showPlus={true} />
          <div className="button-center">
            <Button
              disabled={disableSubmit}
              variant="contained"
              sx={buttonStyle}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
