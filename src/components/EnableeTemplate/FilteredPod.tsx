import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useToggleArrow,
  useToggleDetail,
  useTogglePrevDetails,
  useToggleTemplate,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { badgesArray, pickBadgePicture } from "../../data/BadgesArray";
import IFEPod from "../../models/interfaces/IFEPod";
import IEnablee from "../../models/interfaces/IEnablee";
import ITechnology from "../../models/interfaces/ITechnology";
import PodTemplate from "../PodTemplate/PodTemplate";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";
import "./FilteredPod.css";

interface Props {
  pod: IFEPod;
  enableeTech: ITechnology[];
  selectedPod: IFEPod | undefined;
  handleOnClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const labelStyle = {
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: "15px",
  letterSpacing: "0.025em",
  width: "90px",
  color: "#8A8B8A",
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default function FilteredPod({
  pod,
  enableeTech,
  handleOnClick,
  selectedPod,
}: Props) {
  const [filteredTech, setFilteredTech] = useState<ITechnology[]>([]);
  const [clickedPod] = useState(false);
  const [details, setDetails] = useToggleDetail();
  const [, setToggleArrow] = useToggleArrow();
  const [, setTemplate] = useToggleTemplate();
  const [prevDetails, setPrevDetails] = useTogglePrevDetails();

  useEffect(() => {
    const result = enableeTech.filter((etech) => {
      return pod.project.technology.find((ptech) => {
        return etech.name === ptech.name;
      });
    });
    setFilteredTech(result);
  }, []);

  function togglePodTemplate(pod: IFEPod) {
    details && setPrevDetails([...prevDetails, details]);
    setDetails(pod);
    setTemplate(<PodTemplate />);
    setToggleArrow(true);
  }

  const badgeIndex = pickBadgePicture(pod);

  return (
    <>
      {!clickedPod ? (
        <div className="filtered-pod-container">
          <Typography onClick={() => togglePodTemplate(pod)} sx={labelStyle}>
            {pod.podName}
          </Typography>
          <div className="tech-stack-container">
            <input
              id={pod.podName}
              type="checkbox"
              onChange={handleOnClick}
              data-testid={pod.podName}
              disabled={
                selectedPod ? selectedPod.podName !== pod.podName : false
              }
              checked={
                selectedPod ? selectedPod.podName === pod.podName : false
              }
            ></input>
            <div className="tech-stack-margin">
              {badgeIndex != -1 ? (
                <img className="img" src={badgesArray[badgeIndex].path} />
              ) : (
                <div className="pod-logo" />
              )}

              {filteredTech.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    marginLeft: "1px",
                    width: "7px",
                    height: "12px",
                    display: "inline-block",
                    background: tech.backgroundColor,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
        // <ToggleSideBar template={<PodTemplate />} />
      )}
    </>
  );
}
