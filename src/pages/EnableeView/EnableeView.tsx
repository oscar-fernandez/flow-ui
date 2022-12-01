import { Filter } from "../../components/Filter/Filter";
import "./EnableeView.css";

function EnableeView() {
  return (
    <>
      <Filter
        inputOne="employee id"
        inputTwo="first name"
        inputThree="last name"
        inputFour="tech stack"
      />
    </>
  );
}

export default EnableeView;
