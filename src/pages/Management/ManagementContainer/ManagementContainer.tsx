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

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(Module.tabLabels[newValue]);
    setShowForm(false);
  };

  const customHandleSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    //console.log(mockProjects[+event.currentTarget.id]) //shorthand convert str to number
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
        {showForm ? (
          <FormComponent />
        ) : (
          <>
            <div style={{ backgroundColor: "#E6E8E6" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="text"
                  onClick={toggleShowForm}
                  sx={buttonStyle}
                >
                  + Add {value === "Technology" ? "Skill" : value}
                </Button>
              </Box>
            </div>
            <CustomTableContainer
              headers={headers()}
              rows={fn()}
              headerStyle={headerStyle}
              rowStyle={rowStyle}
              cellStyle={cellStyle}
              customHandleSelection={customHandleSelection}
            />
          </>
        )}
      </div>
    </>
  );
}
