import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import "./EnableeTemplate.css";
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
import ITechnology from "../../models/interfaces/ITechnology";
import { CreateEnablee, UpdateEnablee } from "../../services/EnableeAPI";
import { dummyEnablees } from "../../data/EnableeMock";
import { mockTechnology } from "../../data/MockData";
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
  const [techStack, setTeckStack] = useState<ITechnology[]>([]);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [filteredPods, setFilteredPods] = useState<IFEPod[]>([]);
  const [selectedPod, setSelectedPod] = useState<IFEPod>();

  const [toggle, changeToggle] = useToggle();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSelectedPod(undefined);
    } else {
      const result = mockFePod.filter((p) => p.podName === e.target.id)[0];
      setSelectedPod(result);
    }
  };
  const [enablee, setEnablee] = useToggleDetail();

  // Hacky way to ensure that the useEffect is passed in a Enablee
  function isEnablee(object: any): object is IEnablee {
    return "enablementStartDate" in object;
  }

  useEffect(() => {
    if (enablee && isEnablee(enablee)) {
      setName(`${enablee.firstName} ${enablee.lastName}`);
      setStartDate(new Date(enablee.enablementStartDate));
      setEndDate(new Date(enablee.enablementEndDate));
      setEmployeeId(enablee.employeeId.toString());
      setDateOfJoin(enablee.dateOfJoin);
      const tags = enablee.assetTag ? enablee.assetTag.toString() : "";
      setAssetTag(tags);
      setCountry(enablee.countryCode.toString());
      setCommunity(enablee.communityId.toString());
      const employmentType = enablee.employmentTypeId
        ? enablee.employmentTypeId.toString()
        : "";
      setEmploymentType(employmentType);
      setGrade(enablee.gradeId.toString());
      setTeckStack(enablee.technology);
    }
  }, []);

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
          pod.podStartDate,
          pod.podEndDate,
          startDate.toDateString(),
          endDate.toDateString()
        )
      );
      setFilteredPods(filtered);
    }
  };
  // const handleSubmit2 = (e: ReactFormEvent<HTMLFormElement>) => {
  //   setCommunity("Jolly Holly");
  // };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enablee == null) {
      const tempEnablee: IEnablee = {
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

      postEnablee(tempEnablee);
      navigate(location);
    } else if (isEnablee(enablee)) {
      const tempDetail: IEnablee = enablee;
      tempDetail.employeeId = parseInt(employeeId);
      tempDetail.firstName = name.split(" ")[0];
      tempDetail.lastName = name.split(" ")[1];
      tempDetail.enablementStartDate = startDate.toDateString() || "";
      tempDetail.enablementEndDate = endDate.toDateString() || "";
      tempDetail.dateOfJoin = dateOfJoin;
      tempDetail.assetTag = assetTag;
      tempDetail.isEmployed = isEmployed;
      tempDetail.technology = mockTechnology;
      tempDetail.countryCode = parseInt(country);
      tempDetail.gradeId = parseInt(grade);
      tempDetail.communityId = parseInt(community);
      tempDetail.employmentTypeId = parseInt(employmentType);
      tempDetail.podId = selectedPod.id || 0;
      tempDetail.commentId = [];
      putEnablee(tempDetail);
      navigate(location);
    }
  };

  const postEnablee = (enablee: IEnablee) => {
    CreateEnablee(enablee)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setEnablee(res.data);
          changeToggle();
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
          setEnablee(res.data);
          changeToggle();
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
              {techStack.map((tech: ITechnology) => (
                <TagComponent
                  name={tech.name}
                  color={tech.backgroundColor}
                  key={tech.name}
                />
              ))}
            </div>
          </div>
          <PageViewHeader
            pageTitle={"Pod"}
            showPlus={true}
            isHeader={false}
            plusClicked={false}
          />
          {filteredPods.length > 0 ? (
            <>
              {filteredPods.map((pod) => {
                return (
                  <FilteredPod
                    key={pod.id}
                    pod={pod}
                    enableeTech={techStack}
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
          <PageViewHeader
            pageTitle={"Comments"}
            showPlus={true}
            isHeader={false}
            plusClicked={false}
          />
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
              data-testid={"enableeTemplateSubmitBtn"}
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
