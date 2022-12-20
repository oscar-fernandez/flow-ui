import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import FormComponent from "../../../components/FormComponent/FormComponent";
import Box from "@mui/material/Box";
import ManagementTableComponent from "../../../components/Table/ManagementTableComponent/ManagementTableComponent";
import { useRef, useState, useEffect } from "react";
import { MockRows } from "../../../data/MockData";
import IColumns from "../../../models/interfaces/IColumns";
import { getProjects, getTechnologies } from "../../../services/ManagementAPI";
import {
  updatedTechnology,
  updatedProjects,
} from "../../../utils/utilityFunctions";
import IProjectTable from "../../../models/interfaces/IProjectTable";
import ITechnologyTable from "../../../models/interfaces/ITechnologyTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const tabsStyles = () => ({
  indicator: {
    display: "none",
  },
});

export const tabItemStyles = () => ({
  root: {
    background: "#f7f7f7",
    opacity: 1,
  },
  selected: {
    borderBottomWidth: 0,
    background: "#ffffff",
  },
});

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
  const [useBoolean, setBoolean] = useState(false);
  const projectColumn: IColumns = { topics: ["projectName", "techStack"] };
  const technologyColumn: IColumns = { topics: ["skillName"] };
  let projectRows: IProjectTable[] = [];
  let technologyRows: ITechnologyTable[] = [];

  //making api call here
  const getAll = async () => {
    getTechnologies()
      .then((res) => {
        technologyRows = updatedTechnology(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    getProjects()
      .then((res) => {
        projectRows = updatedProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="margin">
      <Box sx={{ width: "85%" }}>
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
          {useBoolean ? (
            <FormComponent title="Add Project" readonly={false} />
          ) : (
            <ManagementTableComponent
              selectedItem={selectedItem}
              columns={projectColumn}
              rows={MockRows}
              selectedBoolean={setBoolean}
              currentBoolean={useBoolean}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManagementTableComponent
            selectedItem={selectedItem}
            columns={technologyColumn}
            rows={MockRows}
            selectedBoolean={setBoolean}
            currentBoolean={useBoolean}
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
