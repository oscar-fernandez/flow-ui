import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ITechnology from "../../models/interfaces/ITechnology";
import "./FilteredPod.css";

interface Props {
  podName: string;
  podTech: ITechnology[];
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

//need to pass tech as props
export default function FilteredPod({ podName, podTech, enableeTech }: Props) {
  const [filteredTech, setFilteredTech] = useState<ITechnology[]>([]);

  useEffect(() => {
    const result = enableeTech.filter((etech) => {
      return podTech.find((ptech) => {
        return etech.name === ptech.name;
      });
    });
    setFilteredTech(result);
  }, []);

  return (
    <>
      <div className="filtered-pod-container">
        <Typography sx={labelStyle}>{podName}</Typography>
        <div className="tech-stack-container">
          <input type="checkbox"></input>
          <div className="tech-stack-margin">
            {filteredTech.map((tech) => (
              <div
                key={tech.name}
                style={{
                  width: "7px",
                  height: "12px",
                  display: "inline-block",
                  background: tech.backgroundColor,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
