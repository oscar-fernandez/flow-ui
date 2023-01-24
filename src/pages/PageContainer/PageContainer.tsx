import PodAssignment from "../Enablee/PodAssignment/PodAssignment";
import "./PageContainer.css";
import SideBarItems from "../../c../../components/SideBarItems/SideBarItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PendingEnablementStart from "../Enablee/PendingEnablementStart/PendingEnablementStart";
import EnableeView from "../Enablee/EnableeView/EnableeView";
import { LoginComponent } from "../../components/HeaderSectionComponents/LoginComponent/LoginComponent";
import ManagementContainer from "../Management/ManagementContainer/ManagementContainer";

function PageContainer() {
  return (
    <BrowserRouter>
      <div className="page-container" data-testid="page-container">
        <SideBarItems />
        <div className="view-container">
          <LoginComponent name="Andrew" />
          <Routes>
            <Route path="/enablee" element={<EnableeView />} />
            <Route
              path="/enablee/pendingStart"
              element={<PendingEnablementStart />}
            />
            <Route
              path="/enablee/pendingPodAssignment"
              element={<PodAssignment />}
            />
            <Route path="/mgt" element={<ManagementContainer />} />
            <Route path="/pod" element={<div> Pod Master List </div>} />
            <Route path="/pod/active" element={<div> Pod Active List </div>} />
            <Route
              path="/pod/pending"
              element={<div> Pod Pending List </div>}
            />
            <Route
              path="/pod/available"
              element={<div> Pod Available List </div>}
            />
            <Route
              path="/pod/completed"
              element={<div> Pod Completed List </div>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default PageContainer;
