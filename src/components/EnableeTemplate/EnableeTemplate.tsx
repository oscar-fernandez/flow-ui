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
import {
  useToggle,
  useToggleDetail,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import IEnablee from "../../models/interfaces/IEnablee";
import axios from "axios";
import { CreateEnablee, UpdateEnablee } from "../../services/EnableeAPI";
import { dummyEnablees } from "../../data/EnableeMock";
import { Navigate, useLocation, useNavigate } from "react-router";

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
  const [selectedPod, setSelectedPod] = useState<IFEPod>();

  const [detail, changeToggleDetail] = useToggleDetail();
  const [toggle, changeToggle] = useToggle();
  // const navigate=useNavigate();
  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSelectedPod(undefined);
    } else {
      const result = mockFePod.filter((p) => p.podName === e.target.id)[0];
      setSelectedPod(result);
    }
  };

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (detail == null) {
      const enablee: IEnablee = {
        employeeId: parseInt(employeeId),
        lastName: name.split(" ")[1],
        firstName: name.split(" ")[0],
        enablementStartDate: startDate?.toDateString() || "",
        enablementEndDate: endDate?.toDateString() || "",
        dateOfJoin: dateOfJoin,
        assetTag: assetTag,
        isEmployed: isEmployed,
        technology: mockTechnology,
        countryCode: parseInt(country),
        gradeId: parseInt(grade),
        communityId: parseInt(community),
        employmentTypeId: parseInt(employmentType),
        podId: selectedPod?.id || 0,
        commentId: [],
      };

      await postEnablee(enablee);
      changeToggle();
    } else if (detail?.employeeId) {
      const tempDetail: IEnablee = detail;
      tempDetail.assetTag = assetTag;
      await putEnablee(tempDetail);
      changeToggle();
    } else {
      e.preventDefault();
    }
  };

  const postEnablee = (enablee: IEnablee) => {
    CreateEnablee(enablee)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          changeToggleDetail(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const putEnablee = (updateEnablee: IEnablee) => {
    UpdateEnablee(updateEnablee)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          changeToggleDetail(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
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
            <Typography data-testid="dateJoin" sx={dateStyle}>
              {dateOfJoin}
            </Typography>
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
                    pod={pod}
                    enableeTech={mockTechnology}
                    handleOnClick={handleOnClick}
                    selectedPod={selectedPod}
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
              data-testId={"enableeTemplateSubmitBtn"}
              disabled={disableSubmit}
              variant="contained"
              sx={buttonStyle}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
