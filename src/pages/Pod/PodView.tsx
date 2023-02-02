import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router-dom";
import ToggleSidebar from "../../components/ToggleSideBar/ToggleSidebar";
import EnableeTemplate from "../../components/EnableeTemplate/EnableeTemplate";
import "./PodView.css";
import PodTemplate from "../../components/PodTemplate/PodTemplate";

function PodView() {
  return (
    <div className="pod-view-container">
      <PageViewHeader
        pageTitle="Pod"
        showPlus={true}
        isHeader={true}
        plusClicked={false}
      ></PageViewHeader>
      <Outlet />
      <ToggleSidebar template={<PodTemplate />} />
    </div>
  );
}

export default PodView;
