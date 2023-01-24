import { PageViewHeader } from "../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { Outlet } from "react-router-dom";

function PodView() {
  return (
    <>
      <PageViewHeader pageTitle="Pod" showPlus={true}></PageViewHeader>
      <Outlet />
    </>
  );
}

export default PodView;
