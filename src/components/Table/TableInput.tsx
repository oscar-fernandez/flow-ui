import { TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  skill: boolean;
  setTechnology?: (tech: string) => void;
  setSkill?: (skill: boolean) => void;
}

function TableInput({ skill, setTechnology, setSkill }: Props) {
  const [newTechValue, setNewTechValue] = useState("");

  const handleNewTechEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter") {
      setTechnology && setTechnology(target.value);
      setSkill && setSkill(!skill);
      setNewTechValue("");
    }
  };

  return (
    <>
      <div style={{ marginLeft: "1rem" }}>
        <TextField
          id="newSkill"
          type="text"
          variant="standard"
          autoComplete="off"
          value={newTechValue}
          error={newTechValue.trim().length === 0}
          helperText={newTechValue === "" ? "* Invalid Skill Name" : " "}
          onChange={(e) => setNewTechValue(e.target.value)}
          onKeyDown={handleNewTechEnter}
          inputProps={{
            "data-testid": "input",
            style: { padding: "5px 0px" },
          }}
        />
      </div>
    </>
  );
}

export default TableInput;
