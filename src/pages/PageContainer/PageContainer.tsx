import PodAssignment from "../Enablee/PodAssignment/PodAssignment";
import "./PageContainer.css";
import SideBarItems from "../../c../../components/SideBarItems/SideBarItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PendingEnablementStart from "../Enablee/PendingEnablementStart/PendingEnablementStart";
import EnableeView from "../Enablee/EnableeView/EnableeView";
import { LoginComponent } from "../../components/HeaderSectionComponents/LoginComponent/LoginComponent";
import ManagementView from "../Management/ManagementView/ManagementView";

function PageContainer() {
  return (
    <BrowserRouter>
      <div className="page-container" data-testid="page-container">
        <SideBarItems />
        <div className="view-container">
          <LoginComponent name="Andrew" />
          <Routes>
            <Route path="/" element={<EnableeView />} />
            <Route path="/pendingStart" element={<PendingEnablementStart />} />
            <Route path="/pendingPodAssignment" element={<PodAssignment />} />
            <Route path="/mgt" element={<ManagementView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default PageContainer;
