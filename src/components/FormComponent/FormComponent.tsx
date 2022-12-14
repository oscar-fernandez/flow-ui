import { createStyles, InputProps, styled, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { fontWeight } from "@mui/system";
import "./FormComponent.css";

const inputStyle = (theme: any) => ({
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#d9d9d9",
  borderRadius: "10px",
  width: "80%",
  padding: "1rem",
  marginTop: "1rem",
  input: {
    "&::placeholder": {
      fontWeight: "700",
      fontSize: "14px",
    },
  },
});

function FormComponent(props: any) {
  return (
    <div className="form-component">
      <form>
        <h3 data-testid="title">{props.title}</h3>
        <div className="input-order">
          <div className="column">
            <TextField
              error
              required
              inputProps={{
                style: {
                  padding: 0,
                },
                readOnly: props.readonly,
              }}
              InputProps={{ disableUnderline: true }}
              id="standard-basic"
              placeholder="project name"
              variant="standard"
              sx={inputStyle}
            />
            <TextField
              error
              required
              inputProps={{
                style: {
                  padding: 0,
                },
                readOnly: props.readonly,
              }}
              InputProps={{ disableUnderline: true }}
              id="standard-basic"
              placeholder="link to project repository"
              variant="standard"
              sx={inputStyle}
            />
            <TextField
              inputProps={{
                style: {
                  padding: 0,
                },
                readOnly: props.readonly,
              }}
              InputProps={{
                disableUnderline: true,
              }}
              id="standard-basic"
              placeholder="project summary"
              variant="standard"
              sx={inputStyle}
            />
            {/* <input
                            type="text"
                            id="projectName"
                            name="projectName"
                            placeholder="project name"
                            readOnly={props.readonly}
                        />
                        <input
                            type="text"
                            id="projectDescription"
                            name="projectDescription"
                            placeholder="link to project repository"
                            readOnly={props.readonly}
                        />
                        <textarea
                            rows={4}
                            id="projectSummary"
                            name="projectSummary"
                            placeholder="project summary"
                            readOnly={props.readonly}
                            className="project-summary"
                        ></textarea> */}
          </div>
          <div className="column">
            <select multiple className="list">
              <option value="value">Java</option>
            </select>
          </div>
        </div>
        <div className="buttons-margin">
          <div className="buttons">
            <button className="blue-button">Cancel</button>
            <button className="blue-button">Reset</button>
            <button className="orange-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
