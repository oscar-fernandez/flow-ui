import { Drawer } from "@mui/material";
import React, { useState } from "react";

const ToggleSidebar = () => {
  const [toggle, setToggle] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setToggle(open);
    };

  return (
    <>
      <button data-testid={"toggleBtn"} onClick={() => setToggle(true)}>
        Toggle
      </button>

      <Drawer
        anchor={"right"}
        open={toggle}
        onClose={toggleDrawer(false)}
        data-testid={"drawer"}
      >
        {"Hello Im here"}
      </Drawer>
    </>
  );
};

export default ToggleSidebar;
