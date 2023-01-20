import { ListItem, ListItemButton, ListItemText, List } from "@mui/material";
import { useCustomNavigate } from "../customHooks";

interface Props {
  menuItemName: string;
  routePath: string;
  handleOnClick?: (path: string) => void;
  isMainMenu: boolean;
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
      {isMainMenu ? (
        <List>
          <ListItem sx={{ fontSize: 36 }} disablePadding>
            <ListItemButton
              className="side-bar-item"
              onClick={(e) => {
                handleOnClick ? handleOnClick(routePath) : handleNavigate();
              }}
              data-testid={menuItemName}
            >
              <ListItemText
                disableTypography
                sx={{
                  color: itemColor,
                  fontSize: 36,
                  fontFamily: "Darker Grotesque",
                  fontWeight: 700,
                }}
                primary={menuItemName}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem sx={{ fontSize: 15 }} disablePadding>
            <ListItemButton
              className="side-bar-item"
              onClick={(e) => {
                handleOnClick ? handleOnClick(routePath) : handleNavigate();
              }}
              data-testid={menuItemName}
            >
              <ListItemText
                disableTypography
                sx={{
                  color: subMenuItemColor,
                  fontSize: 15,
                  fontFamily: "Darker Grotesque",
                  fontWeight: 400,
                }}
                primary={menuItemName}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </div>
  );
}
