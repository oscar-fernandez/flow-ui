import { ListItem, ListItemButton, ListItemText, List } from "@mui/material";
import { useCustomNavigate } from "../customHooks";

interface Props {
  menuItemName: string;
  routePath: string;
  handleOnClick?: () => void;
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
      <ListItem sx={{ fontSize: 36 }} disablePadding>
        <ListItemButton
          className="side-bar-item"
          onClick={(e) => {
            handleOnClick ? handleOnClick() : handleNavigate();
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
  );
}
