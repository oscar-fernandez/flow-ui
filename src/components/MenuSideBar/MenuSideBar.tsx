import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";

export function clickHandler(e: HTMLInputElement) {
  if (e.classList.contains("enablee-item")) {
    if (!e.classList.contains("selected-item")) {
      e.classList.add("selected-item");
    }
  }
}

function MenuSideBar() {
  //     const [anchorEl, setAnchorEl] = useState(null);
  //     const open = Boolean(anchorEl);
  //     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //     // setAnchorEl();
  //   };

  //   const handleClose = (event) => {
  //     setAnchorEl(null);
  //   };

  return (
    // <div data-testid="userlogin">
    //   <Button
    //     id="basic-button"
    //     data-testid="menu_button"
    //     aria-controls={open ? "basic-menu" : undefined}
    //     aria-haspopup="true"
    //     aria-expanded={open ? "true" : undefined}
    //     onClick={handleClick}
    //   >
    //     <img src="logo_human.png" alt="logo_image" />
    //   </Button>
    //   <Menu
    //     id="basic-menu"
    //     anchorEl={anchorEl}
    //     open={open}
    //     onClose={handleClose}
    //     MenuListProps={{
    //       "aria-labelledby": "basic-button",
    //     }}
    //   >
    //     {JSON.stringify(props.token) !== "{}" ? (
    //       <MenuItem onClick={handleLogout} data-testid="menuLogout">
    //         Logout
    //       </MenuItem>
    //     ) : (
    //       <MenuItem onClick={handleLogin} data-testid="menuLogin">
    //         Login
    //       </MenuItem>
    //     )}
    //   </Menu>
    // </div>

    <div>
      <h1>Menu</h1>
    </div>
  );
}

export default MenuSideBar;
