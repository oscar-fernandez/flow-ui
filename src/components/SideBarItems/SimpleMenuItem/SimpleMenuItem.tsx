import { ListItem, ListItemButton, ListItemText, List } from "@mui/material";
import { useCustomNavigate } from "../customHooks";

interface Props {
  menuItemName: string;
  routePath: string;
  handleOnClick?: (path: string) => void;
}

const itemColor = "#CCCCDA";
const subMenuItemColor = "#000048";

export default function SimpleMenuItem({
  menuItemName,
  routePath,
  handleOnClick,
}: Props) {
  const { handleNavigate } = useCustomNavigate(routePath);

  return (
    <List>
      <ListItem sx={{ fontSize: "20px", lineHeight: "24px" }} disablePadding>
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
              fontFamily: "Darker Grotesque",
            }}
            primary={menuItemName}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
