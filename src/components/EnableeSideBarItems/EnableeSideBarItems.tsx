import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { StyledEngineProvider } from "@mui/material/styles";

const drawerWidth = 248;

export function clickHandler(e: React.MouseEvent) {
  if (!e.currentTarget.classList.contains("selected-item")) {
    const sideBarItems: HTMLCollectionOf<Element> =
      document.getElementsByClassName("side-bar-item");

    for (const item of sideBarItems) {
      if (item.classList.contains("selected-item")) {
        item.classList.remove("selected-item");
      }
    }

    e.currentTarget.classList.add("selected-item");
  }
}

const subItems = [
  { name: "Pending Assignment", testId: "pending-assignment" },
  { name: "Pending Enablement Start", testId: "pending-enablement-start" },
];

const itemColor = "#CCCCDA";

function EnableeSideBarItems() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                bgcolor: "#000048",
              },
              overflowX: "hidden",
            }}
            variant="permanent"
            anchor="left"
          >
            <List>
              <ListItem sx={{ fontSize: 36 }} disablePadding>
                <ListItemButton
                  className="side-bar-item"
                  onClick={(e) => clickHandler(e)}
                  data-testid="enablee-item"
                >
                  <ListItemText
                    disableTypography
                    sx={{
                      color: itemColor,
                      fontSize: 36,
                      fontFamily: "Darker Grotesque",
                      fontWeight: 700,
                    }}
                    primary="Enablee"
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subItems.map((item) => (
                  <ListItem key={item.name} disablePadding>
                    <ListItemButton
                      className="side-bar-item"
                      onClick={(e) => clickHandler(e)}
                      data-testid={item.testId}
                    >
                      <ListItemText
                        disableTypography
                        sx={{
                          pl: 5,
                          whiteSpace: "unset",
                          color: itemColor,
                          fontSize: 24,
                          fontFamily: "Darker Grotesque",
                          fontWeight: 700,
                        }}
                        primary={item.name}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Drawer>
        </Box>
      </StyledEngineProvider>
    </>
  );
}

export default EnableeSideBarItems;
