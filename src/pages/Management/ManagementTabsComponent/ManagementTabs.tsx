import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./ManagementTabs.css";
import { useState } from "react";
import * as Module from "../mgtUtils";

function a11yProps(index: number) {
  return {
    id: `${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManagementTabs({
  handleChange,
}: {
  handleChange: (e: React.SyntheticEvent, newValue: number) => void;
}) {
  const [focus, setFocus] = useState("Projects");

  return (
    <div className="margin">
      <Box sx={{ "& .MuiBox-root": { p: 0 } }}>
        <Box sx={{ "&": { marginLeft: "-16px", marginBottom: "30px" } }}>
          <Tabs
            data-testid="projectTabs"
            value={false}
            onChange={(e: React.SyntheticEvent) => {
              const buttonTitle = e.currentTarget.textContent;
              if (buttonTitle) {
                setFocus(buttonTitle);
                handleChange(e, Module.tabLabels.indexOf(buttonTitle));
              }
            }}
            aria-label="basic tabs example"
            TabIndicatorProps={{ hidden: true }}
            sx={{
              "& button": {
                color: "#000048",
                fontFamily: "Darker Grotesque",
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: "0.025em",
              },
            }}
          >
            <Tab
              data-testid="projectTab"
              label="Projects"
              style={{ backgroundColor: focus === "Projects" ? "#EBEDEB" : "" }}
              {...a11yProps(0)}
            />
            <Tab
              data-testid="techTab"
              label="Technology"
              style={{
                backgroundColor: focus === "Technology" ? "#EBEDEB" : "",
              }}
              {...a11yProps(1)}
            />
            <Tab
              data-testid="gradeTab"
              label="Grade"
              style={{ backgroundColor: focus === "Grade" ? "#EBEDEB" : "" }}
              {...a11yProps(2)}
            />
            <Tab
              data-testid="countryTab"
              label="Country"
              style={{ backgroundColor: focus === "Country" ? "#EBEDEB" : "" }}
              {...a11yProps(3)}
            />
            <Tab
              data-testid="communityTab"
              label="Community"
              style={{
                backgroundColor: focus === "Community" ? "#EBEDEB" : "",
              }}
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}
