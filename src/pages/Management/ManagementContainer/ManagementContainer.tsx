import { useState } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/TableView/CustomTableContainer";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";
import FormComponent from "../../../components/FormComponent/FormComponent";
import { dummyProjects as mockProjects  } from "../../../data/MockApiCall";
import { mockTechnology } from "../../../data/MockData";
import * as Module from "../mgtUtils";


export default function ManagementContainer() {

  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState("Projects");

  const toggleShowForm = () => {
    setShowForm(!showForm);
  }

  const handleChange = (e: React.SyntheticEvent, newValue:number) => {        
    setValue(Module.tabLabels[newValue]);
    setShowForm(false);
  };

  const customHandleSelection = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    console.log(mockProjects[+event.currentTarget.id]) //shorthand convert str to number
  }

  //temporary solution
  function fn () : string[][] {
    switch(value) {
      case "Projects": return Module.transformProjectRowArray(mockProjects);
      case "Technology": return Module.transformTechRowArray(mockTechnology);
      default: return [["no tab matches value"]];
    }
  }

  return (
    <>
      <div>
        <PageViewHeader pageTitle="Management" showPlus={false} />
        {/* TODO: include Filter Component */}
        <ManagementTabs handleChange={handleChange} />
        {
          showForm ? 
          <FormComponent /> :
          <>
            <div onClick={toggleShowForm}>+ Add {value === "Technology" ? "Skill" : value}</div> 
            <CustomTableContainer headers={["header"]} rows={fn()} headerStyle={null} rowStyle={null} cellStyle={null} customHandleSelection={customHandleSelection} />
          </>
        }
      </div>
    </>
  );
}
