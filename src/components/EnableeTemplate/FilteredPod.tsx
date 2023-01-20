import { Typography } from "@mui/material";
import ITechnology from "../../models/interfaces/ITechnology";
import "./FilteredPod.css";

interface Props {
  podName: string;
  technologies: ITechnology[];
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
export default function FilteredPod({ podName, technologies }: Props) {
  return (
    <>
      <div className="filtered-pod-container">
        <Typography sx={labelStyle}>{podName}</Typography>
        <div className="tech-stack-container">
          <input type="checkbox"></input>
          <div className="tech-stack-margin">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="techstack-color"
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
