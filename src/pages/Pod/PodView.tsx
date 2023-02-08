import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router-dom";
import ToggleSidebar from "../../components/ToggleSideBar/ToggleSidebar";
import "./PodView.css";
import PodTemplate from "../../components/PodTemplate/PodTemplate";

function PodView() {
  return (
    <>
      <div className="pod-view-container">
        <PageViewHeader
          pageTitle="Pod"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        ></PageViewHeader>
        <Outlet />
      </div>
      <ToggleSidebar template={<PodTemplate />} />
    </>
  );
}

export default PodView;
