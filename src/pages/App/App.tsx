import ToggleProvider from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import PageRoutes from "../PageRoutes/PageRoutes";
import "./App.css";

function App() {
  return (
    <>
      <ToggleProvider>
        <PageRoutes />
      </ToggleProvider>
    </>
  );
}

export default App;
