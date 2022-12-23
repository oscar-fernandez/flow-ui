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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManagementTabs() {
  const [value, setValue] = React.useState(0);
  const selectedItem = useRef("");
  const projectColumn: IColumns = { topics: ["projectName", "techStack"] };
  const technologyColumn: IColumns = { topics: ["skillName"] };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsShown((current) => !current);
  };

  return (
    <div className="margin">
      <Box sx={{ "& .MuiBox-root": { p: 0 } }}>
        <Box>
          <Tabs
            value={value}
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
        <TabPanel value={value} index={0}>
          <div style={{ width: "100%", backgroundColor: "#E6E8E6" }}>
            {!isShown && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="text"
                  onClick={handleClick}
                  sx={{
                    background: "#E6E8E6",
                    fontWeight: 900,
                    fontSize: "18px",
                    color: "#000048",
                    padding: "16px",
                    "&:hover": {
                      backgroundColor: "#E6E8E6",
                      opacity: "1",
                    },
                  }}
                >
                  + Add Project
                </Button>
              </Box>
            )}
          </div>
          {isShown && (
            <FormComponent
              title="Add Project"
              readonly={false}
              edit={false}
              handleClick={handleClick}
            />
          )}
          {!isShown && (
            <ManagementTableComponent
              selectedItem={selectedItem}
              columns={projectColumn}
              rows={MockRows}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ width: "100%", backgroundColor: "#E6E8E6" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="text"
                sx={{
                  background: "#E6E8E6",
                  fontWeight: 900,
                  fontSize: "18px",
                  color: "#000048",
                  padding: "16px",
                  "&:hover": {
                    backgroundColor: "#E6E8E6",
                    opacity: "1",
                  },
                }}
              >
                + Add Skill
              </Button>
            </Box>
          </div>
          <ManagementTableComponent
            selectedItem={selectedItem}
            columns={technologyColumn}
            rows={MockRows}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
      </Box>
    </div>
  );
}
