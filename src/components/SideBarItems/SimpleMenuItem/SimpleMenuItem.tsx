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
/**
 * m = toggle side bar items
 * s = on hover menu items
 * sm = collapsible menu items
 * @param param0 sidebar items
 * @returns sidebar
 */
export default function SimpleMenuItem({
  menuItemName,
  routePath,
  handleOnClick,
  isMainMenu,
}: Props) {
  const { handleNavigate } = useCustomNavigate(routePath);

  const handleClickAndNavigate = (e: React.MouseEvent) => (
    clickHandler(e), handleOnClick ? handleOnClick(routePath) : handleNavigate()
  );

  return (
    <div>
      {isMainMenu === "m" ? (
        <List sx={{ padding: "0" }}>
          <ListItem disablePadding>
            <ListItemButton
              className="side-bar-item"
              onClick={(e) => {
                handleClickAndNavigate(e);
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
              className="on-hover-item"
              onClick={(e) => {
                handleClickAndNavigate(e);
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
                handleClickAndNavigate(e);
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
