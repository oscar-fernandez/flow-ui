import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import "./EnableeTemplate.css";
import { TagComponent } from "../TagComponent/Tag";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import FilteredPod from "./FilteredPod";
import { isEnableeValidForPod, formatDate } from "../../utils/utilityFunctions";
import IFEPod from "../../models/interfaces/IFEPod";
import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import IEnablee from "../../models/interfaces/IEnablee";
import ITechnology from "../../models/interfaces/ITechnology";
import { CreateEnablee, UpdateEnablee } from "../../services/EnableeAPI";
import { mockTechnology } from "../../data/MockData";
import { useLocation, useNavigate } from "react-router";
import { useAvailablePods } from "../../pages/Pod/Hooks/customHook";
import {
  containsPod,
  isInValidName,
  isValidDate,
} from "./utils/EnableeTemplateUtils";
import { getPodById } from "../../services/PodAPI";
import { convertStringDateToLocalFormat } from "../../pages/Pod/podUtils";

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

const currentDate = new Date();

export default function EnableeTemplate() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [employeeId, setEmployeeId] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState(formatDate(currentDate));
  const [assetTag, setAssetTag] = useState("");
  const [country, setCountry] = useState("");
  const [community, setCommunity] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [isEmployed, setIsEmployed] = useState(true);
  const [grade, setGrade] = useState("");
  const [techStack, setTeckStack] = useState<ITechnology[]>([
    mockTechnology[0],
  ]);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [selectedPod, setSelectedPod] = useState<IFEPod>();
  const [toggle, changeToggle] = useToggle();
  const [templat, setTemplate] = useToggleTemplate();
  const navigate = useNavigate();
  const [enablee, setEnablee] = useToggleDetail();

  const location = useLocation();
  const [availablePods, setAvailablePods] = useAvailablePods(location);
  const [filteredPods, setFilteredPods] = useState<IFEPod[]>([]);
  const [originalPod, setOriginalPod] = useState<IFEPod>(Object);

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
    if (object === null) {
      return false;
    }
    return "enablementStartDate" in object;
  }

  useEffect(() => {
    if (enablee && isEnablee(enablee)) {
      setName(`${enablee.firstName} ${enablee.lastName}`);
      setStartDate(startDateValidator());
      setEndDate(endDateValidator());
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

  // check if all fields are entered
  useEffect(() => {
    if (
      name.trim() === "" ||
      employeeId.trim() === "" ||
      startDate === null ||
      endDate === null
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, employeeId, startDate, endDate]);

  function filterPods(pods: IFEPod[]): IFEPod[] {
    if (startDate && endDate) {
      return pods.filter((pod) =>
        isEnableeValidForPod(
          pod.podStartDate,
          pod.podEndDate,
          startDate.toDateString(),
          endDate.toDateString()
        )
      );
    }
    return [];
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (enablee == null && startDate != null && endDate != null) {
      const tempEnablee: IEnablee = {
        employeeId: parseInt(employeeId),
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        dateOfJoin: dateOfJoin,
        enablementStartDate: formatDate(startDate),
        enablementEndDate: formatDate(endDate),
        assetTag: assetTag,
        isEmployed: isEmployed,
        technology: techStack,
        countryCode: parseInt(country),
        gradeId: parseInt(grade),
        communityId: parseInt(community),
        employmentTypeId: parseInt(employmentType),
        podId: selectedPod?.id || null,
        commentId: [],
      };
      postEnablee(tempEnablee);
    } else if (isEnablee(enablee) && endDate != null && startDate != null) {
      const tempDetail: IEnablee = { ...enablee };
      tempDetail.employeeId = parseInt(employeeId);
      tempDetail.firstName = name.split(" ")[0];
      tempDetail.lastName = name.split(" ")[1];
      tempDetail.dateOfJoin = dateOfJoin;
      tempDetail.enablementStartDate = formatDate(startDate);
      tempDetail.enablementEndDate = formatDate(endDate);
      tempDetail.assetTag = assetTag;
      tempDetail.isEmployed = isEmployed;
      tempDetail.technology = techStack;
      tempDetail.countryCode = parseInt(country);
      tempDetail.gradeId = parseInt(grade);
      tempDetail.communityId = parseInt(community);
      tempDetail.employmentTypeId = parseInt(employmentType);
      tempDetail.podId = selectedPod?.id || null;
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
          setTemplate(null);
          setEnablee(null);
          navigate(location.pathname);
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
          setEnablee(null);
          setTemplate(null);
          navigate(location.pathname);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // function isDisabled(): boolean {
  //   return (
  //     name.trim() === "" ||
  //     employeeId.trim() === "" ||
  //     startDate === null ||
  //     endDate === null
  //   );
  // }

  function nameValidator(): boolean {
    return (
      isEnablee(enablee) && isInValidName(enablee.firstName, enablee.lastName)
    );
  }

  function startDateValidator(): Date | null {
    if (isEnablee(enablee)) {
      return isValidDate(
        convertStringDateToLocalFormat(enablee.enablementStartDate)
      );
    }
    return null;
  }

  function endDateValidator(): Date | null {
    if (isEnablee(enablee)) {
      return isValidDate(
        convertStringDateToLocalFormat(enablee.enablementEndDate)
      );
    }
    return null;
  }

  const resetStartDate = (date: Date) => {
    setStartDate(date);
    setFilteredPods(filterPods(availablePods));
  };

  const resetEndDate = (date: Date) => {
    setEndDate(date);
    setFilteredPods(filterPods(availablePods));
  };

  function setEnableeCurrentPod(): void {
    //selected enablee has non-null podId
    if (isEnablee(enablee) && enablee.podId) {
      //first check if availablePods contain enablee's pod
      let enableeCurrentPod = containsPod(availablePods, enablee.podId);
      //if it doesn't, make call to getPodByID, set enablee's pod, add to available pods, and set selected pod
      if (!enableeCurrentPod) {
        getPodById(enablee.podId)
          .then((res) => {
            enableeCurrentPod = res.data as IFEPod;
            setAvailablePods([enableeCurrentPod, ...availablePods]);
            setSelectedPod(enableeCurrentPod);
            setOriginalPod(enableeCurrentPod);
          })
          .catch((e) => console.error(e));
      } else {
        //and setSelectedPod
        setSelectedPod(enableeCurrentPod);
        setOriginalPod(enableeCurrentPod);
      }
    }
    //selected enablee has null podId, continue as normal
  }

  useEffect(() => {
    setFilteredPods(filterPods(availablePods));
    setEnableeCurrentPod();
    // isDisabled();
  }, [availablePods]);

  //useEffect for updating available pods when date changes
  useEffect(() => {
    setFilteredPods(filterPods(availablePods));
  }, [startDate, endDate]);

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
            error={nameValidator()}
          />
          {!nameValidator() && name.length === 0 ? (
            <div className="form-error">* Enablee Name required</div>
          ) : (
            <div className="dummy-padding"> </div>
          )}

          <div className="grid-container">
            <Typography sx={labelStyle}>Enablement Dates</Typography>
            <DatepickerComponent
              startDate={startDate}
              endDate={endDate}
              setStartDate={resetStartDate}
              setEndDate={resetEndDate}
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
                      enableeTech={isEnablee(enablee) ? enablee.technology : []}
                      handleOnClick={handleOnClick}
                      selectedPod={selectedPod}
                    />
                  );
                })}
              </>
            ) : originalPod.id > 0 ? (
              <FilteredPod
                key={originalPod.id}
                pod={originalPod}
                enableeTech={isEnablee(enablee) ? enablee.technology : []}
                handleOnClick={handleOnClick}
                selectedPod={selectedPod}
              />
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
              // disabled={isDisabled()}
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
