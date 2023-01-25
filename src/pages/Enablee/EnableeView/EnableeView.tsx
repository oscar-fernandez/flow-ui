import { Filter } from "../../../components/Filter/Filter";
import "./EnableeView.css";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";
import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";

export default function EnableeView() {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getTotalPages();
  }, []);

  const getTotalPages = async () => {
    GetPaginatedEnablees(0)
      .then((res) => {
        // setTotalPages(Math.ceil(6));
        setTotalPages(Math.ceil(res.data.totalElements / 25));
      })
      .catch((e) => console.error(e));
  };

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
        <ToggleProvider>
          <GenerateRows pageNum={pageNum} />
        </ToggleProvider>
        <PageNumberCarousel
          totalPages={totalPages}
          currentPageNumber={pageNum}
          setPage={setPageNum}
        />
      </div>
    </>
  );
}
