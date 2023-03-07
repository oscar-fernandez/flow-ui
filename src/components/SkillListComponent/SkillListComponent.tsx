import { Button, Select, TextField, Typography } from "@mui/material";
import ITechnology from "../../models/interfaces/ITechnology";
import { TagComponent } from "../TagComponent/Tag";
import { mockTechnology } from "../../data/MockData";
import {
  filterAllSkills,
  matchTechnologies,
} from "../../utils/utilityFunctions";

import "./SkillList.css";
import { useToggleSkills } from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { useEffect, useState } from "react";

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

export function SkillListComponent({ assignedSkills }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [allSkills, setAllSkills] = useToggleSkills();
  const [dropDownTechStackInput, setDropDownTechStackInput] = useState("");
  const [filteredTechStack, setFilteredTechStack] = useState<ITechnology[]>([]);
  const [originalFilteredTechStack, setOriginalFilteredTechStack] = useState<
    ITechnology[]
  >([]);

  useEffect(() => {
    if (dropDownTechStackInput.trim() === "") {
      //console.log(originalFilteredTechStack);
      setFilteredTechStack(originalFilteredTechStack);
    } else {
      const tempArr = matchTechnologies(
        dropDownTechStackInput,
        filteredTechStack
      );
      setFilteredTechStack(tempArr);
    }
  }, [dropDownTechStackInput]);

  useEffect(() => {
    // console.log(filteredTechStack);
  }, [filteredTechStack]);

  useEffect(() => {
    // console.log(originalFilteredTechStack);
  }, [originalFilteredTechStack]);

  //function that will make the call to utility
  const handleNewSkill = (skills: ITechnology[], allSkills: ITechnology[]) => {
    const tempArr = filterAllSkills(skills, allSkills);
    setFilteredTechStack(tempArr);
    setOriginalFilteredTechStack(filteredTechStack);
  };

  const handleDropDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setDropDownTechStackInput(e.target.value);
    }
    setDropDownTechStackInput(e.target.value);
  };

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
          onClick={() => {
            handleNewSkill(assignedSkills, allSkills);
            setShowDropdown(true);
          }}
        >
          Add Skill
        </Button>
      </div>
      {showDropdown && (
        // <Select value={dropDownTechStack} onChange={handleDropDown} displayEmpty disableUnderline>
        //   </Select>
        <TextField
          type={"text"}
          variant={"standard"}
          value={dropDownTechStackInput}
          onChange={handleDropDown}
        ></TextField>
      )}
    </>
  );
}
