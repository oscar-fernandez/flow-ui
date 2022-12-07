import PodAssignment from "../PodAssignment/PodAssignment";
import "./PageContainer.css";
import EnableeSideBarItems from "../../components/EnableeSideBarItems/EnableeSideBarItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PendingEnablementStart from "../Enablee/PendingEnablementStart/PendingEnablementStart";
import EnableeView from "../Enablee/EnableeView/EnableeView";

function PageContainer() {
  return (
    <BrowserRouter>
      <div className="page-container" data-testid="page-container">
        <EnableeSideBarItems />
        <Routes>
          <Route path="/" element={<EnableeView />} />
          <Route path="/pendingStart" element={<PendingEnablementStart />} />
          <Route path="/pendingPodAssignment" element={<PodAssignment />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default PageContainer;
