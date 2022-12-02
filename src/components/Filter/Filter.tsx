import "./Filter.css";

{
  /*
THIS IS HOW YOU CAN USE THIS COMPONENT

<Filter inputOne="project name" inputTwo="enabler(s)" inputThree="enablees" inputFour="tech stack" />

 */
}
// This is a functional component that may be used throughout Flow
// This component is used for filtering specific information within a table.
export function Filter(props: {
  inputFour: string | undefined;
  inputThree: string | undefined;
  inputTwo: string | undefined;
  inputOne: string | undefined;
}) {
  return (
    <>
      <div className="component-center">
        <input
          className="filter-input1"
          type="text"
          placeholder={props.inputOne}
        />
        <input
          className="filter-input"
          type="text"
          placeholder={props.inputTwo}
        />
        <input
          className="filter-input"
          type="text"
          placeholder={props.inputThree}
        />
        <input
          className="filter-input"
          type="text"
          placeholder={props.inputFour}
        />
        <button className="reset-btn">reset</button>
      </div>
    </>
  );
}
