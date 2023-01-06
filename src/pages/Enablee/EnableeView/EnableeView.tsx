import { Filter } from "../../../components/Filter/Filter";
import "./EnableeView.css";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";

export default function EnableeView() {
  return (
    <>
      <div className="page-section">
        <PageViewHeader
          pageTitle="Enablees"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        />
        <Filter
          inputOne="employee id"
          inputTwo="first name"
          inputThree="last name"
          inputFour="tech stack"
        />
        <GenerateRows />
        <PageNumberCarousel totalPages={10} />
      </div>
    </>
  );
}
