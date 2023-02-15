import "./EnablerView.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";

export default function EnablerView() {
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
          pageTitle="Enablers"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        />
      </div>
    </>
  );
}
