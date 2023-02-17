import { Button, TextField, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
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
import ITechnology from "../../models/interfaces/ITechnology";
import { red } from "@mui/material/colors";
import { CreateEnablee, UpdateEnablee } from "../../services/EnableeAPI";
import { mockTechnology } from "../../data/MockData";
import { useLocation, useNavigate } from "react-router";
import { useAvailablePods, usePodById } from "../../pages/Pod/Hooks/customHook";
import { getDefaultLocale } from "react-datepicker";
import { containsPod } from "./utils/EnableeTemplateUtils";
import { getPodById } from "../../services/PodAPI";

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
  input: {
    fontFamily: "Darker Grotesque",
    fontSize: "32px",
    color: "#000048",
    fontWeight: 700,
    borderBottomColor: "red",
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
  const location = useLocation();
  const [enablee, setEnablee] = useToggleDetail();
  const [availablePods, setAvailablePOds] = useAvailablePods(location);

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSelectedPod(undefined);
    } else {
      const result = filteredPods.filter((p) => p.podName === e.target.id)[0];
      setSelectedPod(result);
    }
  };

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
      setOriginalPod();
    }
  }, []);

  function setOriginalPod(): void {
    //selected enablee has non-null podId
    if (isEnablee(enablee) && enablee.podId) {
      //first check if filteredPods contain enablee's pod
      let enableeCurrentPod = containsPod(filteredPods, enablee.podId);
      //if it doesn't, make call to getPodByID and set enablee's pod
      if (!enableeCurrentPod) {
        getPodById(enablee.podId)
          .then((res) => {
            enableeCurrentPod = res.data;
          })
          .catch((e) => console.error(e));
      } //and setSelectedPod
      setSelectedPod(enableeCurrentPod);
    }
    //selected enablee has null podId, continue as normal
  }

  const filterPods = () => {
    let filtered: IFEPod[] = [];
    if (startDate && endDate) {
      filtered = availablePods.filter((pod) =>
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
  }, [name, employeeId, startDate, endDate, filteredPods]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    } else if (isEnablee(enablee)) {
      const tempDetail: IEnablee = { ...enablee };
      tempDetail.employeeId = parseInt(employeeId);
      tempDetail.firstName = name.split(" ")[0];
      tempDetail.lastName = name.split(" ")[1];
      tempDetail.enablementStartDate = startDate?.toDateString() || "";
      tempDetail.enablementEndDate = endDate?.toDateString() || "";
      tempDetail.dateOfJoin = dateOfJoin;
      tempDetail.assetTag = assetTag;
      tempDetail.isEmployed = isEmployed;
      tempDetail.technology = mockTechnology;
      tempDetail.countryCode = parseInt(country);
      tempDetail.gradeId = parseInt(grade);
      tempDetail.communityId = parseInt(community);
      tempDetail.employmentTypeId = parseInt(employmentType);
      tempDetail.podId = selectedPod?.id || 0;
      tempDetail.commentId = [];
      putEnablee(tempDetail);
    }
  };

  const postEnablee = (enablee: IEnablee) => {
    CreateEnablee(enablee)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setEnablee(res.data);
          changeToggle();
          navigate(location);
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
          navigate(location);
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
            key="name"
            placeholder="Empty"
            variant="standard"
            autoComplete="off"
            sx={titleProps}
            InputProps={InputProps}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ "data-testid": "enableeName" }}
            error={name.trim().length === 0}
          />
          {name.length === 0 ? (
            <div className="form-error">* Enablee Name required</div>
          ) : (
            <div className="dummy-padding"></div>
          )}

          <div className="grid-container">
            <Typography sx={labelStyle}>Enablement Dates</Typography>
            <DatepickerComponent
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <Typography sx={labelStyle}>Employee Id</Typography>
            <div className="id-wrap">
              <TextField
                value={employeeId}
                placeholder="Empty"
                variant="standard"
                autoComplete="off"
                InputProps={InputProps}
                sx={inputStyle}
                onChange={(e) => setEmployeeId(e.target.value)}
                error={employeeId.trim().length === 0}
                inputProps={{ "data-testid": "employeeId" }}
              />
              {employeeId.length === 0 ? (
                <div className="form-error">* Employee Id required</div>
              ) : null}
            </div>
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
          <div className="pod-section">
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
          </div>
          <div className="comment-section">
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
          </div>
          <div className="button-center">
            <Button
              data-testid={"enableeTemplateSubmitBtn"}
              disabled={disableSubmit}
              variant={"contained"}
              sx={buttonStyle}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
