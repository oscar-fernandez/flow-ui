import { Filter } from "../../../components/Filter/Filter";
import "./EnableeView.css";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";
import { OnHoverMenuItems } from "../../../components/OnHoverMenuItems/OnHoverMenuItems";

export default function EnableeView() {
  return (
    <>
      <div className="page-section">
        <PageViewHeader pageTitle="Enablees" showPlus={true} />
        <Filter
          inputOne="employee id"
          inputTwo="first name"
          inputThree="last name"
          inputFour="tech stack"
        />
        <GenerateRows />
        <PageNumberCarousel totalPages={10} />
        <OnHoverMenuItems
          subMenuItems={[
            { name: "Active", routePath: "/active" },
            { name: "Pending Start", routePath: "/pendingstart" },
            { name: "Available", routePath: "/available" },
            { name: "Completed", routePath: "/completed" },
          ]}
        />
      </div>
    </>
  );
}
