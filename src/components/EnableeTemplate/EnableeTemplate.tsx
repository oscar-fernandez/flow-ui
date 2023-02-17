import { Button, TextField, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";
import "./EnableeTemplate.css";
import { TagComponent } from "../TagComponent/Tag";
import { PageViewHeader } from "../HeaderSectionComponents/PageViewHeader/PageViewHeader";
import FilteredPod from "./FilteredPod";
import {
  isEnableeValidForPod,
  isDateObject,
  formatDate,
} from "../../utils/utilityFunctions";
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
import { containsPod, isInValidName } from "./utils/EnableeTemplateUtils";
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

const currentDate = new Date();

export default function EnableeTemplate() {
  // const [name, setName] = useState("");
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);
  // const [employeeId, setEmployeeId] = useState("");
  // const [dateOfJoin, setDateOfJoin] = useState(formatDate(currentDate));
  // const [assetTag, setAssetTag] = useState("");
  // const [country, setCountry] = useState("");
  // const [community, setCommunity] = useState("");
  // const [employmentType, setEmploymentType] = useState("");
  // const [isEmployed, setIsEmployed] = useState(true);
  // const [grade, setGrade] = useState("");
  // const [techStack, setTeckStack] = useState<ITechnology[]>([
  //   mockTechnology[0],
  // ]);
  // // const [disableSubmit, setDisableSubmit] = useState(true);
  // const [filteredPods, setFilteredPods] = useState<IFEPod[]>([]);
  // const [selectedPod, setSelectedPod] = useState<IFEPod>();
  // const [toggle, changeToggle] = useToggle();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [enablee, setEnablee] = useToggleDetail();
  // const [availablePods, setAvailablePods] = useAvailablePods(location);
  // const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.checked) {
  //     setSelectedPod(undefined);
  //   } else {
  //     const result = filteredPods.filter((p) => p.podName === e.target.id)[0];
  //     setSelectedPod(result);
  //   }
  // };
  // Hacky way to ensure that the useEffect is passed in a Enablee
  function isEnablee(object: any): object is IEnablee {
    return "enablementStartDate" in object;
  }
  // useEffect(() => {
  //   if (enablee && isEnablee(enablee)) {
  //     setName(`${enablee.firstName} ${enablee.lastName}`);
  //     if (
  //       enablee.enablementStartDate != null &&
  //       enablee.enablementEndDate != null
  //     ) {
  //       setStartDate(new Date(enablee.enablementStartDate));
  //       setEndDate(new Date(enablee.enablementEndDate));
  //     }
  //     setEmployeeId(enablee.employeeId.toString());
  //     setDateOfJoin(enablee.dateOfJoin);
  //     const tags = enablee.assetTag ? enablee.assetTag.toString() : "";
  //     setAssetTag(tags);
  //     setCountry(enablee.countryCode.toString());
  //     setCommunity(enablee.communityId.toString());
  //     const employmentType = enablee.employmentTypeId
  //       ? enablee.employmentTypeId.toString()
  //       : "";
  //     setEmploymentType(employmentType);
  //     setGrade(enablee.gradeId.toString());
  //     setTeckStack(enablee.technology);
  //     setOriginalPod();
  //   }
  // }, []);
  // function setOriginalPod(): void {
  //   //selected enablee has non-null podId
  //   if (isEnablee(enablee) && enablee.podId) {
  //     //first check if availablePods contain enablee's pod
  //     let enableeCurrentPod = containsPod(availablePods, enablee.podId);
  //     //if it doesn't, make call to getPodByID, set enablee's pod, add to available pods, and set selected pod
  //     if (!enableeCurrentPod) {
  //       getPodById(enablee.podId)
  //         .then((res) => {
  //           enableeCurrentPod = res.data as IFEPod;
  //           setAvailablePods([enableeCurrentPod, ...availablePods]);
  //           setSelectedPod(enableeCurrentPod);
  //           filterPods();
  //         })
  //         .catch((e) => console.error(e));
  //     } else {
  //       //and setSelectedPod
  //       setSelectedPod(enableeCurrentPod);
  //       //filterPods();
  //     }
  //   }
  //   //selected enablee has null podId, continue as normal
  // }
  // //check if all fields are entered
  // // useEffect(() => {
  // //   if (
  // //     name.trim() === "" ||
  // //     employeeId.trim() === "" ||
  // //     startDate === null ||
  // //     endDate === null
  // //   ) {
  // //     setDisableSubmit(true);
  // //   } else {
  // //     filterPods();
  // //     setDisableSubmit(false);
  // //   }
  // // }, [name, employeeId, startDate, endDate]);
  // //[name, employeeId, startDate, endDate, filteredPods]);
  // function filterPods() {
  //   if (startDate instanceof Date && endDate instanceof Date) {
  //     const filtered = availablePods.filter((pod) =>
  //       isEnableeValidForPod(
  //         pod.podStartDate,
  //         pod.podEndDate,
  //         startDate.toDateString(),
  //         endDate.toDateString()
  //       )
  //     );
  //     setFilteredPods((prev) => [...prev, ...filtered]);
  //   }
  // }
  // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (enablee == null && startDate != null && endDate != null) {
  //     const tempEnablee: IEnablee = {
  //       employeeId: parseInt(employeeId),
  //       firstName: name.split(" ")[0],
  //       lastName: name.split(" ")[1],
  //       dateOfJoin: dateOfJoin,
  //       enablementStartDate: formatDate(startDate),
  //       enablementEndDate: formatDate(endDate),
  //       assetTag: assetTag,
  //       isEmployed: isEmployed,
  //       technology: techStack,
  //       countryCode: parseInt(country),
  //       gradeId: parseInt(grade),
  //       communityId: parseInt(community),
  //       employmentTypeId: parseInt(employmentType),
  //       podId: selectedPod?.id || null,
  //       commentId: [],
  //     };
  //     postEnablee(tempEnablee);
  //   } else if (isEnablee(enablee) && endDate != null && startDate != null) {
  //     const tempDetail: IEnablee = { ...enablee };
  //     tempDetail.employeeId = parseInt(employeeId);
  //     tempDetail.firstName = name.split(" ")[0];
  //     tempDetail.lastName = name.split(" ")[1];
  //     tempDetail.dateOfJoin = dateOfJoin;
  //     tempDetail.enablementStartDate = formatDate(startDate);
  //     tempDetail.enablementEndDate = formatDate(endDate);
  //     tempDetail.assetTag = assetTag;
  //     tempDetail.isEmployed = isEmployed;
  //     tempDetail.technology = techStack;
  //     tempDetail.countryCode = parseInt(country);
  //     tempDetail.gradeId = parseInt(grade);
  //     tempDetail.communityId = parseInt(community);
  //     tempDetail.employmentTypeId = parseInt(employmentType);
  //     tempDetail.podId = selectedPod?.id || 0;
  //     tempDetail.commentId = [];
  //     putEnablee(tempDetail);
  //   }
  // };
  // const postEnablee = (enablee: IEnablee) => {
  //   CreateEnablee(enablee)
  //     .then((res) => {
  //       if (res.status == 200 || res.status == 201) {
  //         setEnablee(res.data);
  //         changeToggle();
  //         navigate(location);
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };
  // const putEnablee = (updateEnablee: IEnablee) => {
  //   UpdateEnablee(updateEnablee)
  //     .then((res) => {
  //       if (res.status == 200 || res.status == 201) {
  //         setEnablee(res.data);
  //         changeToggle();
  //         navigate(location);
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };
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

  return (
    <>
      <div className="enablee-container">
        <form>
          <TextField
            value={
              isEnablee(enablee) && `${enablee.firstName} ${enablee.lastName}`
            }
            key="name"
            placeholder="Empty"
            variant="standard"
            autoComplete="off"
            sx={titleProps}
            InputProps={InputProps}
            // onChange={(e) => setName(e.target.value)}
            inputProps={{ "data-testid": "enableeName" }}
            error={nameValidator()}
          />
          {nameValidator() ? (
            <div className="form-error">* Enablee Name required</div>
          ) : (
            <div className="dummy-padding"></div>
          )}
        </form>
      </div>
    </>
  );
}

{
  /* //       <form>
  //         <TextField
  //           value={name}
  //           key="name"
  //           placeholder="Empty"
  //           variant="standard"
  //           autoComplete="off"
  //           sx={titleProps}
  //           InputProps={InputProps}
  //           onChange={(e) => setName(e.target.value)}
  //           inputProps={{ "data-testid": "enableeName" }}
  //           error={name.trim().length === 0}
  //         />
  //         {name.length === 0 ? (
  //           <div className="form-error">* Enablee Name required</div>
  //         ) : (
  //           <div className="dummy-padding"></div>
  //         )}
  //         <div className="grid-container">
  //           <Typography sx={labelStyle}>Enablement Dates</Typography>
  //           <DatepickerComponent
  //             startDate={isDateObject(startDate) ? startDate : null}
  //             endDate={isDateObject(endDate) ? endDate : null}
  //             setStartDate={setStartDate}
  //             setEndDate={setEndDate}
  //           />
  //           <Typography sx={labelStyle}>Employee Id</Typography>
  //           <div className="id-wrap">
  //             <TextField
  //               value={employeeId}
  //               placeholder="Empty"
  //               variant="standard"
  //               autoComplete="off"
  //               InputProps={InputProps}
  //               sx={inputStyle}
  //               onChange={(e) => setEmployeeId(e.target.value)}
  //               error={employeeId.trim().length === 0}
  //               inputProps={{ "data-testid": "employeeId" }}
  //             />
  //             {employeeId.length === 0 ? (
  //               <div className="form-error">* Employee Id required</div>
  //             ) : null}
  //           </div>
  //           <Typography sx={labelStyle}>Date of Join</Typography>
  //           <Typography data-testid="dateJoin" sx={dateStyle}>
  //             {dateOfJoin}
  //           </Typography>
  //           <Typography sx={labelStyle}>Asset Tag</Typography>
  //           <TextField
  //             value={assetTag}
  //             placeholder="Empty"
  //             variant="standard"
  //             autoComplete="off"
  //             InputProps={InputProps}
  //             sx={inputStyle}
  //             onChange={(e) => setAssetTag(e.target.value)}
  //             inputProps={{ "data-testid": "assetTag" }}
  //           />
  //           <Typography sx={labelStyle}>Country</Typography>
  //           <TextField
  //             value={country}
  //             placeholder="Empty"
  //             variant="standard"
  //             autoComplete="off"
  //             InputProps={InputProps}
  //             sx={inputStyle}
  //             onChange={(e) => setCountry(e.target.value)}
  //             inputProps={{ "data-testid": "country" }}
  //           />
  //           <Typography sx={labelStyle}>Community</Typography>
  //           <TextField
  //             value={community}
  //             placeholder="Empty"
  //             variant="standard"
  //             autoComplete="off"
  //             InputProps={InputProps}
  //             sx={inputStyle}
  //             onChange={(e) => setCommunity(e.target.value)}
  //             inputProps={{ "data-testid": "community" }}
  //           />
  //           <Typography sx={labelStyle}>Employment Type</Typography>
  //           <TextField
  //             value={employmentType}
  //             placeholder="Empty"
  //             variant="standard"
  //             autoComplete="off"
  //             InputProps={InputProps}
  //             sx={inputStyle}
  //             onChange={(e) => setEmploymentType(e.target.value)}
  //             inputProps={{ "data-testid": "employmentType" }}
  //           />
  //           <Typography sx={labelStyle}>Is Employed?</Typography>
  //           <div>
  //             <input
  //               type="checkbox"
  //               checked={isEmployed}
  //               onChange={(e) => setIsEmployed(e.target.checked)}
  //               data-testid="isEmployed"
  //             ></input>
  //           </div>
  //           <Typography sx={labelStyle}>Grade</Typography>
  //           <TextField
  //             value={grade}
  //             placeholder="Empty"
  //             variant="standard"
  //             autoComplete="off"
  //             InputProps={InputProps}
  //             sx={inputStyle}
  //             onChange={(e) => setGrade(e.target.value)}
  //             inputProps={{ "data-testid": "grade" }}
  //           />
  //           <Typography sx={labelStyle}>Tech Stack</Typography>
  //           <div>
  //             {techStack.map((tech: ITechnology) => (
  //               <TagComponent
  //                 name={tech.name}
  //                 color={tech.backgroundColor}
  //                 key={tech.name}
  //               />
  //             ))}
  //           </div>
  //         </div>
  //         <div className="pod-section">
  //           <PageViewHeader
  //             pageTitle={"Pod"}
  //             showPlus={true}
  //             isHeader={false}
  //             plusClicked={false}
  //           />
  //           {availablePods.length > 0 ? (
  //             <>
  //               {filteredPods.map((pod) => {
  //                 return (
  //                   <FilteredPod
  //                     key={pod.id}
  //                     pod={pod}
  //                     enableeTech={techStack}
  //                     handleOnClick={handleOnClick}
  //                     selectedPod={selectedPod}
  //                   />
  //                 );
  //               })}
  //             </>
  //           ) : (
  //             <Typography
  //               sx={{
  //                 ...labelStyle,
  //                 width: "none",
  //                 color: "rgba(138, 139, 138, 0.4)",
  //               }}
  //             >
  //               No Pods Match Enablement Dates
  //             </Typography>
  //           )}
  //         </div>
  //         <div className="comment-section">
  //           <PageViewHeader
  //             pageTitle={"Comments"}
  //             showPlus={true}
  //             isHeader={false}
  //             plusClicked={false}
  //           />
  //           <Typography
  //             sx={{
  //               ...labelStyle,
  //               width: "none",
  //               color: "rgba(138, 139, 138, 0.4)",
  //             }}
  //           >
  //             No Comments
  //           </Typography>
  //         </div>
  //         <div className="button-center">
  //           <Button
  //             data-testid={"enableeTemplateSubmitBtn"}
  //             // disabled={disableSubmit}
  //             disabled={isDisabled()}
  //             variant={"contained"}
  //             sx={buttonStyle}
  //             onClick={(e) => {
  //               handleSubmit(e);
  //             }}
  //           >
  //             Submit
  //           </Button>
  //         </div>
  //       </form> */
}
