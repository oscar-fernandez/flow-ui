import PodAssignment from "../Enablee/PodAssignment/PodAssignment";
import "./PageRoutes.css";
import SideBarItems from "../../components/SideBarItems/SideBarItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnableeView from "../Enablee/EnableeView/EnableeView";
import { LoginComponent } from "../../components/HeaderSectionComponents/LoginComponent/LoginComponent";
import ManagementContainer from "../Management/ManagementContainer/ManagementContainer";
import PodPageContainer from "../Pod/PodPageContainer";
import {
  useCompletedPods,
  useAvailablePods,
  useActivePods,
  usePendingStartPods,
} from "../Pod/Hooks/customHook";
import PodView from "../Pod/PodView";
import { EnableePageContainer } from "../Enablee/EnableePageContainer/EnableePageContainer";
import { usePendingStartEnablees } from "../Enablee/Hooks/customHook";
import { useAllEnablees } from "../Enablee/Hooks/useAllEnablees";
import {
  generatePodTags,
  getAvailablePodTag,
} from "../../utils/utilityFunctions";

function PageRoutes() {
  return (
    <BrowserRouter>
      <div className="page-container" data-testid="page-container">
        <SideBarItems />
        <div className="view-container">
          <LoginComponent name="Andrew" />

          <Routes>
            <Route>
              <Route path="/enablee" element={<EnableeView />}>
                <Route
                  path=""
                  element={
                    <EnableePageContainer
                      hook={useAllEnablees}
                      displayPageCarousel={true}
                    />
                  }
                />
                <Route
                  path="pendingStart"
                  element={
                    <EnableePageContainer
                      hook={usePendingStartEnablees}
                      displayPageCarousel={false}
                    />
                  }
                />
                <Route
                  path="pendingPodAssignment"
                  element={<PodAssignment />}
                />
              </Route>
            </Route>

            <Route path="/mgt" element={<ManagementContainer />} />
            <Route>
              <Route path="/pod" element={<PodView />}>
                <Route
                  path="pending"
                  element={
                    <PodPageContainer
                      hook={usePendingStartPods}
                      displayTag={getAvailablePodTag}
                    />
                  }
                />
                <Route
                  path="completed"
                  element={
                    <PodPageContainer
                      hook={useCompletedPods}
                      displayTag={generatePodTags}
                    />
                  }
                />
                <Route
                  path="available"
                  element={
                    <PodPageContainer
                      hook={useAvailablePods}
                      displayTag={generatePodTags}
                    />
                  }
                />
                <Route
                  path="active"
                  element={
                    <PodPageContainer
                      hook={useActivePods}
                      displayTag={getAvailablePodTag}
                    />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default PageRoutes;
