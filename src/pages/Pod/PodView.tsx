import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router-dom";
import ToggleSidebar from "../../components/ToggleSideBar/ToggleSidebar";
import EnableeTemplate from "../../components/EnableeTemplate/EnableeTemplate";

function PodView() {
  return (
    <>
      <PageViewHeader pageTitle="Pod" showPlus={true}></PageViewHeader>
      <Outlet />
      {/* need to change to pod template */}
      <ToggleSidebar template={<EnableeTemplate></EnableeTemplate>} />
    </>
  );
}

export default PodView;
