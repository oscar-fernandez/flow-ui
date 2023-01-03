import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
            <Tab data-testid="projectTab" label="Projects" {...a11yProps(0)} />
            <Tab data-testid="techTab" label="Technology" {...a11yProps(1)} />
            <Tab label="Grade" {...a11yProps(2)} />
            <Tab label="Country" {...a11yProps(3)} />
            <Tab label="Community" {...a11yProps(4)} />
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}
