import { Button, Typography } from "@mui/material";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";
import { mockTechnology } from "../../data/MockData";
import { filterAllSkills } from "../../utils/utilityFunctions";

import "./SkillList.css";
import { useToggleSkills } from "../../context/ToggleSideBarContext/ToggleSideBarContext";

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
  assignedSkills: ITechnology[];
}

//function that will make the call to utility
const handleNewSkill = (skills: ITechnology[], allSkills: ITechnology[]) => {
  filterAllSkills(skills, allSkills);
};

export function SkillListComponent({ assignedSkills }: Props) {
  const [allSkills, setAllSkills] = useToggleSkills();

  return (
    <>
      <Typography sx={labelStyle}>Tech Stack</Typography>
      <div>
        {assignedSkills.map((skill) => (
          <TagComponent
            name={skill.name}
            color={skill.backgroundColor}
            key={skill.id}
          />
        ))}
        <Button
          data-testid={"skillAddBtn"}
          disabled={false}
          sx={buttonStyle}
          onClick={() => handleNewSkill(assignedSkills, allSkills)}
        >
          Add Skill
        </Button>
      </div>
    </>
  );
}
