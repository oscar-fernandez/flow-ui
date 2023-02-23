import { Button, Typography } from "@mui/material";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";

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
  padding: ".3rem 1.25rem",
  textTransform: "none",
  boxShadow: "none",
};

interface Props {
  allSkills: ITechnology[];
}

export function SkillListComponent({ allSkills }: Props) {
  return (
    <div className="skills-container">
      <Typography sx={labelStyle}>Tech Stack</Typography>

      {allSkills.map((skill) => (
        <TagComponent
          name={skill.name}
          color={skill.backgroundColor}
          key={skill.id}
        />
      ))}
      <div className="button-add-skill">
        <Button data-testid={"skillAddBtn"} disabled={false} sx={buttonStyle}>
          Add Skill
        </Button>
      </div>
    </div>
  );
}
