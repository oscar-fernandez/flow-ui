import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { StyledEngineProvider } from "@mui/material/styles";
import ColMenuItem from "./ColMenuItem/ColMenuItem";
import SimpleMenuItem from "./SimpleMenuItem/SimpleMenuItem";
import {
  MenuItemsList,
  EnableeSubMenuItems,
  PodSubMenuItems,
  EnablerSubMenuItems,
} from "./menuItems";
import { useNavigate } from "react-router";

const drawerWidth = 270;

const podSubItems = [
  { name: "Active", testID: "pod-active", url: "/active" },
  { name: "Pending Start", testId: "pending-start", url: "/pendingStart" },
  { name: "Available", testId: "pod-available", url: "/available" },
  { name: "Completed", testId: "pod-completed", url: "/completed" },
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

function SideBarItems() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
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
            <List sx={{ padding: "0" }}>
              <ListItem disablePadding>
                <ListItemButton
                  className="side-bar-item"
                  // onClick={(e) => {}}
                  data-testid="flow-logo"
                >
                  <ListItemText
                    disableTypography
                    sx={{
                      color: "#CCCCDA",
                      fontSize: 20,
                      fontFamily: "Oleo Script Swash Caps",
                      fontWeight: 700,
                      letterSpacing: "0.025em",
                      width: "70px",
                      height: "27px",
                      fontStyle: "normal",
                    }}
                    primary={MenuItemsList[0].name}
                  />
                </ListItemButton>
              </ListItem>
              <SimpleMenuItem
                menuItemName={MenuItemsList[1].name}
                routePath={"/enabler"}
                handleOnClick={handleNavigate}
                isMainMenu={"m"}
              />
              <ListItem data-testid="pod-item" disablePadding>
                <ColMenuItem
                  menuItemName={MenuItemsList[2].name}
                  subMenuItems={PodSubMenuItems}
                />
              </ListItem>
              <ListItem data-testid="enablee-item" disablePadding>
                <ColMenuItem
                  menuItemName={MenuItemsList[3].name}
                  subMenuItems={EnableeSubMenuItems}
                />
              </ListItem>
              <SimpleMenuItem
                menuItemName={MenuItemsList[4].name}
                routePath={"/mgt"}
                handleOnClick={handleNavigate}
                isMainMenu={"m"}
              />
            </List>
          </Drawer>
        </Box>
      </StyledEngineProvider>
    </div>
  );
}

export default SideBarItems;
