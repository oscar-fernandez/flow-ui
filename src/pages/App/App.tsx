import ToggleProvider from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import PageContainer from "../PageContainer/PageContainer";
import "./App.css";

function App() {
  return (
    <>
      <ToggleProvider>
        <PageContainer />
      </ToggleProvider>
    </>
  );
}

export default App;
