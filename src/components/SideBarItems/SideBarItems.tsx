import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { StyledEngineProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ColMenuItem from "./ColMenuItem/ColMenuItem";
import {
  listOfSubMenuItems1,
  listOfSubMenuItems2,
} from "../../data/SubMenuMock";

const drawerWidth = 248;
const sideBarItems = [
  {
    name: "Enablee",
    testId: "enablee",
    url: "/",
  },
  {
    name: "Management",
    testId: "management",
    url: "/mgt",
  },
];
const subItems = [
  {
    name: "Pending Pod Assignment",
    testId: "pending-assignment",
    url: "/pendingPodAssignment",
  },
  {
    name: "Pending Enablement Start Date",
    testId: "pending-enablement-start",
    url: "/pendingStart",
  },
];

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

const itemColor = "#CCCCDA";

function EnableeSideBarItems() {
  const navigate = useNavigate();
  const clickNavigateCombined = (event: any, path: string) => {
    clickHandler(event);
    navigate(path);
  };

  return (
    <div className="side-bar-container">
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
                overflowY: "inherit",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <List>
              <ListItem
                sx={{
                  fontSize: 36,
                  display: "inline-block",
                  position: "relative",
                }}
                disablePadding
              >
                <ListItemButton
                  className="side-bar-item"
                  onClick={(e) => {
                    clickNavigateCombined(e, "/");
                  }}
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
                      onClick={(e) => {
                        clickNavigateCombined(e, item.url);
                      }}
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
            <List>
              <ListItem
                sx={{
                  fontSize: 36,
                  display: "inline-block",
                  position: "relative",
                }}
                disablePadding
              >
                <ListItemButton
                  className="side-bar-item"
                  onClick={(e) => {
                    clickNavigateCombined(e, "/mgt");
                  }}
                  data-testid="management"
                >
                  <ListItemText
                    disableTypography
                    sx={{
                      color: itemColor,
                      fontSize: 36,
                      fontFamily: "Darker Grotesque",
                      fontWeight: 700,
                    }}
                    primary="Management"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ColMenuItem
                  menuItemName="Test 1"
                  subMenuItems={listOfSubMenuItems1}
                />
              </ListItem>
            </List>
          </Drawer>
        </Box>
      </StyledEngineProvider>
    </div>
  );
}

export default EnableeSideBarItems;
