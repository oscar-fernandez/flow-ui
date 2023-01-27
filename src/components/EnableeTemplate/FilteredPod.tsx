import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IFEPod from "../../models/interfaces/IFEPod";
import ITechnology from "../../models/interfaces/ITechnology";
import "./FilteredPod.css";

interface Props {
  pod: IFEPod;
  enableeTech: ITechnology[];
}

const labelStyle = {
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: "15px",
  letterSpacing: "0.025em",
  width: "90px",
  color: "#8A8B8A",
};

export default function FilteredPod({ pod, enableeTech }: Props) {
  const [filteredTech, setFilteredTech] = useState<ITechnology[]>([]);
  const [selectedPod, setSelectedPod] = useState(false);

  useEffect(() => {
    const result = enableeTech.filter((etech) => {
      return pod.project.technology.find((ptech) => {
        return etech.name === ptech.name;
      });
    });
    setFilteredTech(result);
  }, []);

  return (
    <>
      <div className="filtered-pod-container">
        <Typography sx={labelStyle}>{pod.podName}</Typography>
        <div className="tech-stack-container">
          <input
            checked={selectedPod}
            type="checkbox"
            onChange={(e) => setSelectedPod(e.target.checked)}
            data-testid="selectedPod"
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
    </>
  );
}
