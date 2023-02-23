import { Drawer } from "@mui/material";
import React, { useEffect } from "react";
import {
  useToggle,
  useToggleArrow,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import "./ToggleSideBar.css";

interface ToggleSBProps {
  template: React.ReactNode;
}

const ToggleSideBar = ({ template }: ToggleSBProps) => {
  const [toggle, setToggle] = useToggle();
  const [showArrow, setShowArrow] = useToggleArrow();

  return (
    <>
      <Drawer
        anchor={"right"}
        open={toggle}
        onClose={() => setToggle()}
        data-testid={"drawer"}
        PaperProps={{
          // This is all class names to style children components of the drawer.
          sx: {
            // Width of the entire drawer
            minWidth: "30%",
            "& .sidebar": {
              width: "100%",
              padding: "0 0 0 4rem ",
            },
            // Where the text-fields are, overflowY gives the scroll.
            "& .sidebar-content": {
              display: "flex",
              flexDirection: "column",
              marginTop: "1.5rem",
              gap: "25px",
              height: "65vh",
              overflowY: "auto",
            },
            "& .sidebar-title": {
              color: "#000048",
              fontSize: "20px",
            },
            // View Comment Button
            "& .sidebar-button-div": {
              marginX: "auto",
              padding: "3vh 0vw 3vh 0",
            },
            "& .sidebar-button": {
              fontFamily: "Darker Grotesque",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "18px",
              letterSpacing: ".25rem",
              backgroundColor: "#DC8D0B",
              padding: "0 1.5vw",
              borderRadius: "10px",
              color: "#F8e8c4",
              border: "none",
            },
            "& .sidebar-button:hover": {
              backgroundColor: "#e7af54",
            },
            "& .sidebar-input-pill": {
              borderRadius: "10px",
              height: "20px",
            },
            // Close button
            "& .sidebar-x-button": {
              marginLeft: "auto",
              marginRight: "10%",
              marginTop: "10%",
            },
            "& .sidebar-x-button-svg": {
              cursor: "pointer",
            },
            // Close button
            "& .sidebar-back-button": {
              marginRight: "auto",
              marginLeft: "10%",
              marginTop: "10%",
            },
            "& .sidebar-back-button-svg": {
              cursor: "pointer",
            },
            "& .sidebar-button-container": {
              display: "flex",
            },
          },
        }}
      >
        <div className="sidebar-button-container">
          {showArrow && (
            <div className="sidebar-back-button">
              <svg
                className="sidebar-back-button-svg"
                data-testid={"back-btn"}
                onClick={() => {
                  // Change view here when back button is clicked
                  setShowArrow(false);
                }}
                width="35"
                height="35"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0469 19.9062C13.5156 19.4375 13.4688 18.7344 13.0469 18.2656L7.375 12.875H20.875C21.4844 12.875 22 12.4062 22 11.75V10.25C22 9.64062 21.4844 9.125 20.875 9.125H7.375L13.0469 3.78125C13.4688 3.3125 13.5156 2.60938 13.0469 2.14062L12.0156 1.10938C11.5938 0.6875 10.8438 0.6875 10.4219 1.10938L1.32812 10.25C0.859375 10.6719 0.859375 11.375 1.32812 11.7969L10.4219 20.9375C10.8438 21.3594 11.5469 21.3594 12.0156 20.9375L13.0469 19.9062Z"
                  fill="#DC8D0B"
                />
              </svg>
            </div>
          )}
          <div className="sidebar-x-button">
            <svg
              className="sidebar-x-button-svg"
              data-testid={"close-btn"}
              onClick={() => {
                setToggle();
              }}
              width="26"
              height="27"
              viewBox="0 0 26 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0156 13.5L25.0469 6.46875C25.9609 5.625 25.9609 4.21875 25.0469 3.375L23.5 1.82812C22.6562 0.914062 21.25 0.914062 20.4062 1.82812L13.375 8.85938L6.27344 1.82812C5.42969 0.914062 4.02344 0.914062 3.17969 1.82812L1.63281 3.375C0.71875 4.21875 0.71875 5.625 1.63281 6.46875L8.66406 13.5L1.63281 20.6016C0.71875 21.4453 0.71875 22.8516 1.63281 23.6953L3.17969 25.2422C4.02344 26.1562 5.42969 26.1562 6.27344 25.2422L13.375 18.2109L20.4062 25.2422C21.25 26.1562 22.6562 26.1562 23.5 25.2422L25.0469 23.6953C25.9609 22.8516 25.9609 21.4453 25.0469 20.6016L18.0156 13.5Z"
                fill="#DC8D0B"
              />
            </svg>
          </div>
        </div>
        {template}
      </Drawer>
    </>
  );
};

export default ToggleSideBar;
