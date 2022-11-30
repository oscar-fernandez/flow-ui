import { useState } from "react";
import Row from "../../components/RowComponent/Row";
import { dummyEnablees } from "../../components/ToggleSideBar/Dummydata";
import ToggleSidebar from "../../components/ToggleSideBar/ToggleSidebar";
import PageContainer from "../PageContainer/PageContainer";
import "./App.css";

function App() {
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <PageContainer />
      {dummyEnablees.map((enablee, i) => {
        return (
          <Row
            id={enablee.employeeId}
            firstName={enablee.firstName}
            lastName={enablee.lastName}
            techStack={["Java", "React", "Rust", "C++"]}
            key={i}
            onClick={() => {
              setToggle(!toggle);
              setIndex(i);
            }}
          />
        );
      })}

      <ToggleSidebar
        toggle={toggle}
        setToggle={() => {
          setToggle(!toggle);
        }}
        details={dummyEnablees[index]}
      />
    </>
  );
}

export default App;
