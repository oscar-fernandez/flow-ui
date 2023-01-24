import { ListItem, ListItemButton, ListItemText, List } from "@mui/material";
import { useCustomNavigate } from "../customHooks";
import { clickHandler } from "../SideBarItems";

interface Props {
  menuItemName: string;
  routePath: string;
  handleOnClick?: (path: string) => void;
  isMainMenu: string;
}

const itemColor = "#CCCCDA";
const subMenuItemColor = "#000048";

export default function SimpleMenuItem({
  menuItemName,
  routePath,
  handleOnClick,
  isMainMenu,
}: Props) {
  const { handleNavigate } = useCustomNavigate(routePath);

  return (
    <div>
      {isMainMenu === "m" ? (
        <List sx={{ padding: "0" }}>
          <ListItem disablePadding>
            <ListItemButton
              className="side-bar-item"
              onClick={(e) => {
                handleOnClick
                  ? (clickHandler(e), handleOnClick(routePath))
                  : (clickHandler(e), handleNavigate());
              }}
              data-testid={menuItemName}
            >
              <ListItemText
                disableTypography
                sx={{
                  color: itemColor,
                  fontSize: 20,
                  fontFamily: "Darker Grotesque",
                }}
                primary={menuItemName}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : isMainMenu === "s" ? (
        <List sx={{ padding: "0" }}>
          <ListItem disablePadding>
            <ListItemButton
              className="side-bar-item"
              onClick={(e) => {
                handleOnClick
                  ? (clickHandler(e), handleOnClick(routePath))
                  : (clickHandler(e), handleNavigate());
              }}
              data-testid={menuItemName}
            >
              <ListItemText
                disableTypography
                sx={{
                  color: subMenuItemColor,
                  fontSize: 15,
                  fontFamily: "Darker Grotesque",
                }}
                primary={menuItemName}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : isMainMenu === "sm" ? (
        <List sx={{ padding: "0" }}>
          <ListItem disablePadding>
            <ListItemButton
              className="side-bar-item"
              onClick={(e) => {
                handleOnClick
                  ? (clickHandler(e), handleOnClick(routePath))
                  : (clickHandler(e), handleNavigate());
              }}
              data-testid={menuItemName}
            >
              <ListItemText
                disableTypography
                sx={{
                  color: itemColor,
                  fontSize: 20,
                  fontFamily: "Darker Grotesque",
                }}
                primary={menuItemName}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}
    </div>
  );
}
