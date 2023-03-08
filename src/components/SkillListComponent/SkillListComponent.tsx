import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
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
import { selectStyle } from "../UtilFormComponents/FormStyles";

const labelStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: 600,
  color: "#8A8B8A",
  fontSize: "15px",
  letterSpacing: "0.025em",
  width: "90px",
};

const dropDownContainerStyle = {
  width: 120,
  maxHeight: 100,
  overflow: "auto",
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
  const [allSkills] = useToggleSkills();
  const [dropDownTechStackInput, setDropDownTechStackInput] = useState("");
  const [filteredTechStack, setFilteredTechStack] = useState<ITechnology[]>([]);
  const [originalFilteredTechStack, setOriginalFilteredTechStack] = useState<
    ITechnology[]
  >([]);
  const [techToAddToStack, setTechToAddToStack] = useState<ITechnology[]>([]);

  useEffect(() => {
    if (dropDownTechStackInput.trim() === "") {
      setFilteredTechStack(originalFilteredTechStack);
    } else {
      const tempArr = matchTechnologies(
        dropDownTechStackInput,
        originalFilteredTechStack
      );
      setFilteredTechStack(tempArr);
    }
  }, [dropDownTechStackInput]);

  useEffect(() => {
    setTechToAddToStack(assignedSkills);
  }, [assignedSkills]);

  //function that will make the call to utility
  const handleNewSkill = (skills: ITechnology[], allSkills: ITechnology[]) => {
    const tempArr = filterAllSkills(skills, allSkills);
    if (techToAddToStack.length > 0) {
      setFilteredTechStack(filterAllSkills(techToAddToStack, tempArr));
    } else {
      setFilteredTechStack(tempArr);
      setOriginalFilteredTechStack(tempArr);
    }
  };

  const handleDropDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropDownTechStackInput(e.target.value);
  };

  const handleTechnologyAdd = (e: React.MouseEvent<HTMLLIElement>) => {
    const techToAdd = e.currentTarget.textContent;
    const techToAddObj = allSkills.find((tech) => tech.name === techToAdd);
    const filteredTechExcludingNewTech = filteredTechStack.filter(
      (tech) => tech.name !== techToAddObj?.name
    );
    setFilteredTechStack(filteredTechExcludingNewTech);
    if (techToAddObj) {
      setTechToAddToStack([...techToAddToStack, techToAddObj]);
    }
  };

  return (
    <>
      <Typography sx={labelStyle}>Tech Stack</Typography>
      <div>
        {techToAddToStack.map((skill) => (
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
            setShowDropdown(!showDropdown);
          }}
        >
          {assignedSkills.length === 0 && !showDropdown && "*Add Skills"}
          {!showDropdown && assignedSkills.length > 0 && "Add Skills"}
          {showDropdown && "Complete Selection"}
        </Button>
      </div>
      {showDropdown && (
        <>
          <TextField
            type={"text"}
            variant={"standard"}
            value={dropDownTechStackInput}
            onChange={handleDropDown}
            placeholder={"Search For Skills"}
            autoComplete={"off"}
          ></TextField>
          <FormControl sx={dropDownContainerStyle} className="dropDown">
            {filteredTechStack.map((tech) => {
              return (
                <MenuItem
                  key={tech.id}
                  value={tech.name}
                  data-testid={tech.name}
                  sx={selectStyle}
                  className="dropDownItem"
                  onClick={handleTechnologyAdd}
                >
                  {tech.name}
                </MenuItem>
              );
            })}
          </FormControl>
        </>
      )}
    </>
  );
}
