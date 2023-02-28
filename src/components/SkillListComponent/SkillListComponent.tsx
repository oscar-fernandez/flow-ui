import { Button, Typography } from "@mui/material";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";
import { mockTechnology } from "../../data/MockData";

import "./SkillList.css";
const labelStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
  color: "#8A8B8A",
  fontSize: "15px",
  letterSpacing: "0.025em",
  width: "90px",
};

const buttonStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
  color: "#8A8B8A",
  fontSize: "15px",
  letterSpacing: "0.025em",
  paddingLeft: "0",
  textTransform: "none",
  boxShadow: "none",
};

interface Props {
  allSkills: ITechnology[];
}

export function SkillListComponent({ allSkills }: Props) {
  return (
    <>
      <Typography sx={labelStyle}>Tech Stack</Typography>
      <div>
        {allSkills.map((skill) => (
          <TagComponent
            name={skill.name}
            color={skill.backgroundColor}
            key={skill.id}
          />
        ))}
        <Button data-testid={"skillAddBtn"} disabled={false} sx={buttonStyle}>
          Add Skill
        </Button>
      </div>
    </>
  );
}
