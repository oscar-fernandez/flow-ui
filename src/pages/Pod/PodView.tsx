import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router-dom";
import ToggleSidebar from "../../components/ToggleSideBar/ToggleSidebar";
import EnableeTemplate from "../../components/EnableeTemplate/EnableeTemplate";
import "./PodView.css";

function PodView() {
  return (
    <div className="pod-view-container">
      <PageViewHeader pageTitle="Pod" showPlus={true}></PageViewHeader>
      <Outlet />
      {/* need to change to pod template */}
      <ToggleSidebar template={<EnableeTemplate></EnableeTemplate>} />
    </div>
  );
}

export default PodView;
