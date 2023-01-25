import { useNavigate } from "react-router";
import { useToggle } from "../customHooks";
import { Collapse, Box } from "@mui/material";
import SimpleMenuItem from "../SimpleMenuItem/SimpleMenuItem";
import { Popover } from "@mui/material";
import { OnHoverMenuItems } from "../../OnHoverMenuItems/OnHoverMenuItems";
import SubMenuItem from "../../../models/interfaces/ISubMenuItem";
import "./ColMenuItem.css";
import React from "react";

interface Props {
  menuItemName: string;
  subMenuItems: SubMenuItem[];
}

export default function ColMenuItem({ menuItemName, subMenuItems }: Props) {
  const { toggle, handleClick } = useToggle(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  let currentlyHovering = false;

  const handleOnMouseEnter = (event: any) => {
    currentlyHovering = true;
    if (!toggle) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleOnMouseEnterHoverMenu = () => {
    currentlyHovering = true;
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCloseHover = () => {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handlePopoverClose();
      }
    }, 50);
  };

  const toggleAndNavigate = (route: string) => {
    navigate(route);
    handlePopoverClose();
    if (!toggle) {
      handleClick();
    }
  };

  const handleHoverOnClick = (route: string) => {
    handlePopoverClose();
    handleClick();
    if (!toggle) {
      navigate(route);
    }
  };

  return (
    <div className="colMenuItem-container">
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleCloseHover}>
        <SimpleMenuItem
          menuItemName={menuItemName}
          routePath={subMenuItems[0].routePath}
          handleOnClick={handleHoverOnClick}
          isMainMenu={"m"}
        />
      </div>
      <Popover
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={{ pointerEvents: "none", transform: "translateX(3px)" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
      >
        <Box
          sx={{ pointerEvents: "auto" }}
          onMouseEnter={handleOnMouseEnterHoverMenu}
          onMouseLeave={handleCloseHover}
          data-testid="hover-menu"
        >
          <OnHoverMenuItems
            subMenuItems={subMenuItems}
            customClick={toggleAndNavigate}
          />
        </Box>
      </Popover>
      <Collapse in={toggle} timeout={1}>
        <div>
          {subMenuItems.map((item, idx) => (
            <SimpleMenuItem
              menuItemName={item.name}
              routePath={item.routePath}
              key={idx}
              isMainMenu={"sm"}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
