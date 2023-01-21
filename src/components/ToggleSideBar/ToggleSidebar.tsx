import { Button, Drawer, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import IEnablee from "../../models/interfaces/IEnablee";
import ITechnology from "../../models/interfaces/ITechnology";
import "./ToggleSideBar.css";

//Props interface for sidebar comment.
interface ToggleSBProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  details: IEnablee;
  action: Action;
}

//Enum to indicate if the page Adds/Edit/View
export enum Action {
  ADD = "Add",
  EDIT = "Edit",
  VIEW = "View",
}

const ToggleSidebar = ({
  toggle,
  setToggle,
  details,
  action,
}: ToggleSBProps) => {
  //Hard coded array for enablee labels, more should be made for pods and enablers.
  const enablee_labels = [
    "podId",
    "fName",
    "lName",
    "joinDate",
    "startDate",
    "endDate",
    "assetTag",
    "isEmployed",
    "techStack",
    "countryCode",
    "gradeID",
    "comId",
    "employType",
    "podId",
    "commentId(s)",
  ];

  const [title, setTitle] = useState("");

  //Whenever the details propped is updated, the title is set to match properly.
  useEffect(() => {
    let str = "";
    //Checks for isEmployed because the isEmployed property is unique to the Enablee interface and not in the Enabler/Pod
    if (action === Action.VIEW && "isEmployed" in details) {
      str = details.firstName + " " + details.lastName;
    } else {
      str += " enablee";
      if (action === Action.EDIT) str = "Edit" + str;
      else {
        str = "Add" + str;
      }
    }
    setTitle(str);
  }, [action, details]);

  return (
    <>
      <Drawer
        anchor={"right"}
        open={toggle}
        onClose={() => setToggle(false)}
        data-testid={"drawer"}
        PaperProps={{
          // This is all class names to style children components of the drawer.
          sx: {
            // Width of the entire drawer
            width: "30%",
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
          },
        }}
      >
        <div className="sidebar-x-button">
          <svg
            className="sidebar-x-button-svg"
            data-testid={"close-btn"}
            onClick={() => {
              setToggle(false);
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

        <div className="sidebar">
          <div className="sidebar-title">
            <h3>{title}</h3>
          </div>
          <div className="sidebar-content">
            {/* Iterates through the keys of an object, and creates a respective label/textField for each object. */}
            {Object.keys(details).map((keyName, index) => {
              const display: string = formatString(
                details[keyName as keyof IEnablee]
              );
              return (
                <div key={index} className="textFieldContainer">
                  {/* Label for each text field to give context to the information being displayed */}
                  <label className="labelField">
                    {enablee_labels[index]}:{" "}
                  </label>
                  {/* The Text field is used to display the information inside Ienablee future work will have it display Pod and Enableers 
                  information as well. */}
                  <TextField
                    disabled
                    className="sidebar-input-pill"
                    defaultValue={display}
                    variant="filled"
                    key={index}
                    placeholder={keyName}
                    // Styling for each text field
                    InputProps={{
                      sx: {
                        height: 30,
                        borderRadius: "10px",
                        textAlign: "center",
                        width: "12vw",
                        display: "flex",
                        paddingBottom: "1rem",
                        alignItems: "center",
                      },
                      disableUnderline: true,
                    }}
                  >
                    details[keyName]
                  </TextField>
                </div>
              );
            })}
          </div>
        </div>
        {/* a MUI button that will be used to view comments more work will be done to make it dynamic so it can be 
        used in other parts of the program */}
        <div className="sidebar-button-div">
          <Button variant="contained" className="sidebar-button">
            View Comments{" "}
          </Button>
        </div>
      </Drawer>
    </>
  );
};
//formatString takes in argument called data which could be any of the data types below and returns a formatted string
//to be displayed in the text field
const formatString = (
  data: number | string | boolean | number[] | Date | ITechnology[]
): string => {
  let str = "";
  //Checks to see if data is both an Array and contains attributes unqiue to ITechnology
  if (
    Array.isArray(data) &&
    data[0] &&
    typeof data[0] !== "number" &&
    "id" in data[0] &&
    "name" in data[0]
  ) {
    (data as ITechnology[]).forEach((item, i) => {
      str += i === data.length - 1 ? item?.name : item?.name + ", ";
    });
  } else if (data instanceof Date) {
    str = data.toLocaleDateString();
  } else if (data != null) {
    str = data.toString();
  } else {
    return "";
  }
  return str;
};

export default ToggleSidebar;
