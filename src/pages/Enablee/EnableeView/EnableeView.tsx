import "./EnableeView.css";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import ToggleProvider from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { useEffect, useState } from "react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import PodTemplate from "../../../components/PodTemplate/PodTemplate";
import { Outlet } from "react-router";
import ToggleSidebar from "../../../components/ToggleSideBar/ToggleSidebar";
import EnableeTemplate from "../../../components/EnableeTemplate/EnableeTemplate";
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
      <ToggleSidebar template={<EnableeTemplate></EnableeTemplate>} />
    </>
  );
}
