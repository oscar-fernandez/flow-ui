import { Filter } from "../../../components/Filter/Filter";
import "./EnableeView.css";
import PageNumberCarousel from "../../../components/PageNumberCarousel/PageNumberCarousel";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";
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
        <PageViewHeader pageTitle="Enablees" showPlus={true} />
        <Filter
          inputOne="employee id"
          inputTwo="first name"
          inputThree="last name"
          inputFour="tech stack"
        />
        <GenerateRows pageNum={pageNum} />
        <PageNumberCarousel
          totalPages={totalPages}
          currentPageNumber={pageNum}
          setPage={setPageNum}
        />
      </div>
    </>
  );
}
