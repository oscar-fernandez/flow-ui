import "./EnableeView.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import { Outlet, useLocation, useNavigate } from "react-router";
import ToggleSidebar from "../../../components/ToggleSideBar/ToggleSidebar";
import EnableeTemplate from "../../../components/EnableeTemplate/EnableeTemplate";
import IEnablee from "../../../models/interfaces/IEnablee";
import { daysUntilPodStarts } from "../../../utils/utilityFunctions";
// import { Filter } from "../../../components/Filter/Filter";

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

  useEffect(() => {
    daysUntilPodStarts(new Date("03-01-2023"));
  }, []);

  return (
    <>
      <div className="page-section">
        <PageViewHeader
          pageTitle="Enablees"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        />
        {/* <Filter
          inputOne="employee id"
          inputTwo="first name"
          inputThree="last name"
          inputFour="tech stack"
        /> */}
        <Outlet />
      </div>
      {/* <ToggleSidebar template={<EnableeTemplate></EnableeTemplate>} /> */}
    </>
  );
}
