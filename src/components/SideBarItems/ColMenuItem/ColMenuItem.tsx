import { useNavigate } from "react-router";
import { useToggle } from "../customHooks";
import { Collapse, Box } from "@mui/material";
import SimpleMenuItem from "../SimpleMenuItem/SimpleMenuItem";
import { Popover } from "@mui/material";
import "./ColMenuItem.css";
import React from "react";

//move to interfaces directory
interface SubMenuItem {
  name: string;
  routePath: string;
  handleOnClick: () => void;
}

interface Props {
  menuItemName: string;
  subMenuItems: SubMenuItem[];
}

const ChildComp: React.FC = () => (
  <p className="hover-menu">This is a child component</p>
);

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

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handlePopoverClose();
      }
    }, 50);
  }

  const toggleAndNavigate = () => {
    handleClick();
    if (!toggle) {
      navigate(subMenuItems[0].routePath);
    }
  };

  return (
    <div className="colMenuItem-container">
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleCloseHover}>
        <SimpleMenuItem
          menuItemName={menuItemName}
          routePath={subMenuItems[0].routePath}
          handleOnClick={handleClick}
        />
      </div>
      <Popover
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={{ pointerEvents: "none" }}
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
        >
          <ChildComp />
        </Box>
      </Popover>
      <Collapse in={toggle} timeout={1}>
        <div>
          {subMenuItems.map((item, idx) => (
            <SimpleMenuItem
              menuItemName={item.name}
              routePath={item.routePath}
              key={idx}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
