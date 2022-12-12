import "./FormComponent.css";

function FormComponent() {
  return (
    <div className="form-component">
      <form className="form-margin">
        <h3>Add Project</h3>
        <div className="input-order">
          <div className="column">
            <input
              type="text"
              id="projectName"
              name="projectName"
              placeholder="project name"
            />
            <input
              type="text"
              id="projectDescription"
              name="projectDescription"
              placeholder="link to project repository"
            />
            <input
              type="text"
              id="linkToRepo"
              name="linkToRepo"
              placeholder="project summary"
            />
          </div>
          <div className="column">
            <input
              type="text"
              id="techstack"
              name="techstack"
              placeholder="tech stack"
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
