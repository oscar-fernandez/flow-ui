import { ListItem, ListItemButton, ListItemText, List } from "@mui/material";
import { useCustomNavigate } from "../customHooks";

interface Props {
  menuItemName: string;
  routePath: string;
  handleOnClick?: (e: any) => void;
}

const itemColor = "#CCCCDA";

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
            handleOnClick ? handleOnClick(e) : handleNavigate();
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
