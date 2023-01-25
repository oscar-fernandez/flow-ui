import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import "./EnableeTemplate.css";
import { mockTechnology } from "../../data/MockData";
import { TagComponent } from "../TagComponent/Tag";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import FilteredPod from "./FilteredPod";
import { mockFePod } from "../../data/MockFEPod";
import { isEnableeValidForPod } from "../../utils/utilityFunctions";
import IFEPod from "../../models/interfaces/IFEPod";

const InputProps = {
  disableUnderline: true,
};

const dateStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: "600",
  color: "#8A8B8A",
  fontSize: "15px",
  letterSpacing: "0.025em",
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
  "&:disabled": {
    backgroundColor: "rgba(220, 141, 11, 0.5)",
    color: "#F8E8CE",
  },
};

const labelStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
  color: "#8A8B8A",
  fontSize: "15px",
  letterSpacing: "0.025em",
  width: "90px",
};

const current = new Date().toLocaleDateString("en-us", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function EnableeTemplate() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [employeeId, setEmployeeId] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState(current);
  const [assetTag, setAssetTag] = useState("");
  const [country, setCountry] = useState("");
  const [community, setCommunity] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [isEmployed, setIsEmployed] = useState(true);
  const [grade, setGrade] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [filteredPods, setFilteredPods] = useState<IFEPod[]>([]);

  //check if all fields are entered
  useEffect(() => {
    if (
      name.trim() === "" ||
      employeeId.trim() === "" ||
      startDate === null ||
      endDate === null
    ) {
      setDisableSubmit(true);
    } else {
      filterPods();
      setDisableSubmit(false);
    }
  }, [name, employeeId, startDate, endDate]);

  const filterPods = () => {
    if (startDate && endDate) {
      const filtered = mockFePod.filter((pod) =>
        isEnableeValidForPod(
          pod,
          startDate.toDateString(),
          endDate.toDateString()
        )
      );
      setFilteredPods(filtered);
    }
  };

  return (
    <>
      <div className="enablee-container">
        <form>
          <TextField
            value={name}
            placeholder="Empty"
            variant="standard"
            autoComplete="off"
            sx={titleProps}
            InputProps={InputProps}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ "data-testid": "enableeName" }}
            error={name.trim().length === 0}
            helperText={
              name.trim().length === 0 ? "* Enablee Name required" : " "
            }
          />
          <div className="grid-container">
            <Typography sx={labelStyle}>Enablement Dates</Typography>
            <DatepickerComponent
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <Typography sx={labelStyle}>Employee Id</Typography>
            <TextField
              value={employeeId}
              placeholder="Empty"
              variant="standard"
              autoComplete="off"
              InputProps={InputProps}
              sx={inputStyle}
              onChange={(e) => setEmployeeId(e.target.value)}
              error={employeeId.trim().length === 0}
              helperText={
                employeeId.trim().length === 0 ? "* Id required" : " "
              }
              inputProps={{ "data-testid": "employeeId" }}
            />
            <Typography sx={labelStyle}>Date of Join</Typography>
            <Typography sx={dateStyle}>{dateOfJoin}</Typography>
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
              inputProps={{ "data-testid": "employmentType" }}
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
              inputProps={{ "data-testid": "grade" }}
            />
            <Typography sx={labelStyle}>Tech Stack</Typography>
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
          <PageViewHeader pageTitle={"Pod"} showPlus={true} />
          {filteredPods.length > 0 ? (
            <>
              {filteredPods.map((pod) => {
                return (
                  <FilteredPod
                    key={pod.id}
                    podName={pod.podName}
                    podTech={pod.project.technology}
                    enableeTech={mockTechnology}
                  />
                );
              })}
            </>
          ) : (
            <Typography
              sx={{
                ...labelStyle,
                width: "none",
                color: "rgba(138, 139, 138, 0.4)",
              }}
            >
              No Pods Match Enablement Dates
            </Typography>
          )}
          <PageViewHeader pageTitle={"Comments"} showPlus={true} />
          <Typography
            sx={{
              ...labelStyle,
              width: "none",
              color: "rgba(138, 139, 138, 0.4)",
            }}
          >
            No Comments
          </Typography>
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
