import "./FormComponent.css";

function FormComponent(props: any) {
  return (
    <div className="form-component">
      <form>
        <h3 data-testid="title">{props.title}</h3>
        <div className="input-order">
          <div className="column">
            <input
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
            <input
              type="text"
              id="linkToRepo"
              name="linkToRepo"
              placeholder="project summary"
              readOnly={props.readonly}
            />
          </div>
          <div className="column">
            <input
              type="text"
              id="techstack"
              name="techstack"
              placeholder="tech stack"
              readOnly={props.readonly}
            />
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
