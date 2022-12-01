import { Button, Drawer, TextField } from "@mui/material";
import { elementTypeAcceptingRef } from "@mui/utils";
import IEnablee from "../../models/interfaces/IEnablee";
import ITechnology from "../../models/interfaces/ITechnology";

interface ToggleSBProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  details: IEnablee;
}

export enum Action {
  ADD = "Add",
  EDIT = "Edit",
  VIEW = "View",
}

const ToggleSidebar = ({ toggle, setToggle, details }: ToggleSBProps) => {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={toggle}
        onClose={() => setToggle(false)}
        data-testid={"drawer"}
        PaperProps={{
          sx: {
            width: "20%",
            "& .sidebar": {
              width: "100%",
              paddingX: "3rem",
            },
            "& .sidebar-content": {
              display: "flex",
              flexDirection: "column",
              marginTop: "1.5rem",
              gap: "20px",
            },
            "& .sidebar-title": {
              color: "#000048",
              fontSize: "20px",
            },
            "& .sidebar-button-div": {
              marginX: "auto",
              padding: "5vh 0vw",
            },
            "& .sidebar-button": {
              fontFamily: "Darker Grotesque",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "18px",
              letterSpacing: ".25rem",
              backgroundColor: "#DC8D0B",
              padding: "0 2.5vw",
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
            <h3>Add Pod</h3>
          </div>
          <div className="sidebar-content">
            {Object.keys(details).map((keyName, index) => {
              const display: string = formatString(
                details[keyName as keyof IEnablee]
              );
              return (
                <TextField
                  disabled
                  className="sidebar-input-pill"
                  defaultValue={display}
                  variant="filled"
                  key={index}
                  placeholder={keyName}
                  InputProps={{
                    sx: {
                      height: 30,
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "14vw",
                      display: "flex",
                      paddingBottom: "1rem",
                      alignItems: "center",
                    },
                    disableUnderline: true,
                  }}
                >
                  details[keyName]
                </TextField>
              );
            })}
          </div>
        </div>
        <div className="sidebar-button-div">
          {/* <button className="sidebar-button" type="submit">
            Submit{" "}
          </button> */}
          <Button variant="contained" className="sidebar-button">
            Submit{" "}
          </Button>
        </div>
      </Drawer>
    </>
  );
};

const formatString = (
  data: number | string | boolean | number[] | Date | ITechnology[]
): string => {
  let str = "";
  if (
    Array.isArray(data) &&
    data[0] &&
    typeof data[0] !== "number" &&
    "id" in data[0] &&
    "name" in data[0]
  ) {
    (data as ITechnology[]).map((item, i) => {
      str += i === data.length - 1 ? item?.name : item?.name + ", ";
    });
  } else if (data instanceof Date) {
    str = data.toLocaleDateString();
  } else {
    str = data.toString();
  }
  return str;
};

export default ToggleSidebar;
