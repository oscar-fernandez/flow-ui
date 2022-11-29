import { useState } from "react";
import Row from "../../components/RowComponent/Row";
import ToggleSidebar from "../../components/ToggleSideBar/ToggleSidebar";
import PageContainer from "../PageContainer/PageContainer";
import "./App.css";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <PageContainer />
      <Row
        id={1481}
        firstName={"Steve"}
        lastName={"Bob"}
        techStack={["Java", "React", "Rust", "C++"]}
        onClick={() => {
          setToggle(!toggle);
        }}
      />

      <ToggleSidebar
        toggle={toggle}
        setToggle={() => {
          setToggle(!toggle);
        }}
      />
    </>
  );
}

export default App;
