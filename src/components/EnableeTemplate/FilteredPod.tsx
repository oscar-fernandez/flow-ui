import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useToggleArrow,
  useToggleDetail,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import IFEPod from "../../models/interfaces/IFEPod";
import ITechnology from "../../models/interfaces/ITechnology";
import PodTemplate from "../PodTemplate/PodTemplate";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";
import "./FilteredPod.css";

interface Props {
  pod: IFEPod;
  enableeTech: ITechnology[];
  selectedPod: IFEPod | undefined;
  handleOnClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  originalPodId?: number | false;
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
  originalPodId,
}: Props) {
  const [filteredTech, setFilteredTech] = useState<ITechnology[]>([]);
  const [clickedPod, setClickedPod] = useState(false);
  const [details, setDetails] = useToggleDetail();
  const [toggleArrow, setToggleArrow] = useToggleArrow();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const result = enableeTech.filter((etech) => {
      return pod.project.technology.find((ptech) => {
        return etech.name === ptech.name;
      });
    });
    setFilteredTech(result);
  }, []);

  function togglePodTemplate(pod: IFEPod) {
    setToggleArrow(true);
    setDetails(pod);
    setClickedPod(true);
  }

  const checkF = () => {
    if (checked) {
      setChecked(false);
    } else setChecked(true);
  };

  const check = () => {
    if (originalPodId === pod.id) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  // const checked = (): boolean => {
  //   let bool = false;
  //   if (originalPodId === pod.id) {
  //     bool = true;
  //   } else {
  //     bool = false;
  //   }
  //   return bool;
  // };

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
              checked={originalPodId === pod.id}
            ></input>
            <div className="tech-stack-margin">
              <div className="pod-logo" />
              {filteredTech.map((tech) => (
                <div
                  key={tech.name}
                  style={{
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
        <ToggleSideBar template={<PodTemplate />} />
      )}
    </>
  );
}
