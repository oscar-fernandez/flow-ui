import { useRef, useState } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";
import FormComponent from "../../../components/FormComponent/FormComponent";
import { dummyProjects as mockProjects } from "../../../data/MockApiCall";
import { mockTechnology } from "../../../data/MockData";
import * as Module from "../mgtUtils";
import { Box, Button } from "@mui/material";

const headerStyle = {
  minWidth: 50,
  background: "#E6E8E6",
  fontWeight: 700,
  fontSize: "24px",
  color: "#000048",
  borderRight: "1px solid #000048",
  "&:last-child": { borderRight: "none" },
};

const cellStyle = {
  fontSize: "18px",
  border: "none",
  color: "inherit",
};

const rowStyle = {
  border: "5px solid black",
  "&.MuiTableRow-root:hover": {
    cursor: "pointer",
    backgroundColor: "#DC8D0B",
    color: "#000048",
  },
};

const buttonStyle = {
  background: "#E6E8E6",
  fontWeight: 900,
  fontSize: "18px",
  color: "#000048",
  padding: "16px",
  "&:hover": {
    backgroundColor: "#E6E8E6",
    opacity: "1",
  },
};

export default function ManagementContainer() {
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(Module.tabLabels[0]);
  const [active, setActive] = useState("Table");
  const selectedRow = useRef({});

  const toggleShowForm = () => {
    switch (value) {
      case "Projects":
        setShowForm(!showForm);
        setActive("Form");
    }
  };

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(Module.tabLabels[newValue]);
    setShowForm(false);
    setActive("Table");
  };

  const customHandleSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    selectedRow.current = mockProjects[+event.currentTarget.id]; //shorthand convert str to number
    switch (value) {
      case "Projects":
        setActive("Details");
    }
  };

  //temporary
  function fn(): string[][] {
    switch (value) {
      case "Projects":
        return Module.transformProjectRowArray(mockProjects);
      case "Technology":
        return Module.transformTechRowArray(mockTechnology);
      default:
        return [["no tab matches value"]];
    }
  }

  function headers(): string[] {
    switch (value) {
      case "Projects":
        return ["project name", "tech stack"];
      case "Technology":
        return ["skill name"];
      default:
        return ["no tab matches value"];
    }
  }

  return (
    <>
      <div>
        <PageViewHeader pageTitle="Management" showPlus={false} />
        {/* TODO: include Filter Component */}
        <ManagementTabs handleChange={handleChange} />
        <div style={{ backgroundColor: "#E6E8E6" }}>
          {active === "Table" && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="text" onClick={toggleShowForm} sx={buttonStyle}>
                + Add {value === "Technology" ? "Skill" : value}
              </Button>
            </Box>
          )}
        </div>
        {active === "Table" && (
          <CustomTableContainer
            headers={headers()}
            rows={fn()}
            headerStyle={headerStyle}
            rowStyle={rowStyle}
            cellStyle={cellStyle}
            customHandleSelection={customHandleSelection}
          />
        )}
        {active === "Form" && (
          <FormComponent
            title="Add Project"
            readonly={false}
            edit={false}
            selectedRow={""}
            handleClick={() => setActive("Table")}
          />
        )}
        {active === "Details" && (
          <FormComponent
            title="Project Details"
            readonly={true}
            edit={true}
            selectedRow={selectedRow}
            handleClick={() => setActive("Table")}
            handleEdit={() => setActive("Edit")}
          />
        )}
        {active === "Edit" && (
          <FormComponent
            title="Edit Project"
            readonly={false}
            edit={false}
            selectedRow={selectedRow}
            handleClick={() => setActive("Table")}
          />
        )}
      </div>
    </>
  );
}
