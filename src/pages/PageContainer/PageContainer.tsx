import PodAssignment from "../Enablee/PodAssignment/PodAssignment";
import "./PageContainer.css";
import SideBarItems from "../../c../../components/SideBarItems/SideBarItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PendingEnablementStart from "../Enablee/PendingEnablementStart/PendingEnablementStart";
import EnableeView from "../Enablee/EnableeView/EnableeView";
import { LoginComponent } from "../../components/HeaderSectionComponents/LoginComponent/LoginComponent";
import ManagementContainer from "../Management/ManagementContainer/ManagementContainer";
import PodPageContainer from "../Pod/PodPageContainer";
import {
  useCompletedPods,
  useAvailablePods,
  useActivePods,
} from "../Pod/Hooks/customHook";
import {
  getActivePendingPodTag,
  getAvailablePodTag,
} from "../../utils/utilityFunctions";
import IFEPod from "../../models/interfaces/IFEPod";

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
            <Route
              path="/pod/pending"
              element={<div> Pod Pending List </div>}
            />
            <Route
              path="/pod/completed"
              element={
                <PodPageContainer
                  hook={useCompletedPods}
                  displayPageCarousel={false}
                  title={"Pod"}
                  displayTag={(pod: IFEPod) => {
                    return { name: "", color: "" };
                  }}
                />
              }
            />
            <Route
              path="/pod/available"
              element={
                <PodPageContainer
                  hook={useAvailablePods}
                  displayPageCarousel={false}
                  title={"Pod"}
                  displayTag={getActivePendingPodTag}
                />
              }
            />
            <Route
              path="/pod/active"
              element={
                <PodPageContainer
                  hook={useActivePods}
                  displayPageCarousel={false}
                  title={"Pod"}
                  displayTag={getAvailablePodTag}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default PageContainer;
