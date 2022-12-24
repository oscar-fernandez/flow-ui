import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import FormComponent from "../../../components/FormComponent/FormComponent";
import Box from "@mui/material/Box";
import ManagementTableComponent from "../../../components/Table/ManagementTableComponent/ManagementTableComponent";
import { useRef, useState } from "react";
import { MockRows } from "../../../data/MockData";
import IColumns from "../../../models/interfaces/IColumns";
import { Button } from "@mui/material";
import TableContainer from "../../../components/Table/TableView/TableContainer";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabLabels = ["Projects", "Technology", "Grade", "Country", "Community"];

export default function ManagementTabs() {
  const [value, setValue] = React.useState("Projects");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(tabLabels[newValue]);
  };

  return (
    <div className="margin">
      <Box sx={{ "& .MuiBox-root": { p: 0 } }}>
        <Box>
          <Tabs
            value={false}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="basic tabs example"
            TabIndicatorProps={{ hidden: true }}
            sx={{
              "& button": {
                color: "#000048",
                fontFamily: "Darker Grotesque",
                fontWeight: 900,
                fontSize: 18,
              },
              "& button.Mui-selected": { backgroundColor: "#EBEDEB" },
            }}
          >
            <Tab label="Projects" {...a11yProps(0)} />
            <Tab label="Technology" {...a11yProps(1)} />
            <Tab label="Grade" {...a11yProps(2)} />
            <Tab label="Country" {...a11yProps(3)} />
            <Tab label="Community" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <div>+ Add {value === "Technology" ? "Skill" : value}</div>
        <TableContainer
          headers={[`${value}ss`, "headers"]}
          rows={[`${value}sss`, "rows"]}
        />
      </Box>
    </div>
  );
}
