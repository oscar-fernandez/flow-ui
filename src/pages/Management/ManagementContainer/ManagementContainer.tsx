import { useRef, useState, useEffect } from "react";
import { PageViewHeader } from "../../../components/HeaderSectionComponents/PageViewHeader/PageViewHeader";
import CustomTableContainer from "../../../components/Table/CustomTableContainer";
import ManagementTabs from "../ManagementTabsComponent/ManagementTabs";
import FormComponent from "../../../components/FormComponent/FormComponent";
import EnablerTemplate from "../../../components/EnablerTemplate/EnablerTemplate";
import * as Module from "../mgtUtils";
import {
  getTechnologies,
  getProjects,
  createTechnology,
} from "../../../services/ManagementAPI";
import IProject from "../../../models/interfaces/IProject";
import ITechnology from "../../../models/interfaces/ITechnology";
import CustomTableButton from "../../../components/Table/CustomTableButton";
import "./ManagementContainer.css";

const headerStyle = {
  fontFamily: "Darker-Grotesque",
  minWidth: 50,
  background: "#E6E8E6",
  fontWeight: 700,
  fontSize: "15px",
  color: "#000048",
  borderRight: "1px solid #000048",
  "&:last-child": { borderRight: "none" },
};

const cellStyle = {
  fontFamily: "Darker Grotesque",
  fontWeight: 400,
  letterSpacing: "0.025em",
  fontSize: "15px",
  border: "none",
  color: "inherit",
};

const rowStyle = {
  border: "5px solid black",
  "&.MuiTableRow-root:hover": {
    cursor: "pointer",
    backgroundColor: "#DC8D0B",
    color: "#000048",
  },
};

const buttonStyle = {
  background: "#FFFFF",
  fontFamily: "Darker Grotesque",
  fontWeight: 900,
  fontSize: "15px",
  color: "#000048",
  "&:hover": {
    backgroundColor: "#E6E8E6",
    opacity: "1",
  },
  float: "right",
  marginTop: "none",
  padding: "none",
};

export default function ManagementContainer() {
  const [value, setValue] = useState(Module.tabLabels[0]);
  const [active, setActive] = useState("Table");
  const selectedRow = useRef({});
  const [skill, setSkill] = useState(false);
  // const [technologies, setTechnologies] = useState(mockTechnology);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const [allTechnologies, setAllTechnologies] = useState<ITechnology[]>([]);

  const toggleShowForm = () => {
    switch (value) {
      case "Projects":
        setTechnologies([]);
        setActive("Form");
        break;
      case "Technology":
        setSkill(!skill);
        break;
    }
  };

  useEffect(() => {
    getListOfProjects();
    getListOfTechnology();
  }, []);

  const getListOfProjects = async () => {
    getProjects()
      .then((res: any) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getListOfTechnology = () => {
    getTechnologies()
      .then((res: any) => {
        setAllTechnologies(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleProjectChange = (project: IProject) => {
    if (value == "Projects" && active === "Form") {
      const tempProjects = projects.map((proj) => {
        return { ...proj };
      });
      tempProjects.push(project);
      setProjects(tempProjects);
    } else if (value == "Projects" && active === "Edit") {
      const index = projects.findIndex((item) => item.id == project.id);
      if (index != -1) {
        const tempProjects = projects.map((proj) => {
          return { ...proj };
        });
        tempProjects[index] = project;
        setProjects(tempProjects);
      }
    }
  };

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(Module.tabLabels[newValue]);
    setActive("Table");
    setSkill(false);
  };

  const customHandleSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    selectedRow.current = projects[+event.currentTarget.id];
    setTechnologies(projects[+event.currentTarget.id].technology); //shorthand convert str to number
    switch (value) {
      case "Projects":
        setActive("Details");
    }
  };

  const handleTechnology = (tech: string) => {
    const newTechnology = {
      id: 0,
      name: tech,
      backgroundColor: Module.getRandomColor(),
    };
    setAllTechnologies([newTechnology, ...allTechnologies]);
    createTechnology(newTechnology)
      .then((res) => {
        setTechnologies([res.data, ...technologies]);
      })
      .catch((error) => console.error(error));
  };

  //temporary
  function fn(): string[][] {
    switch (value) {
      case "Projects":
        return Module.transformProjectRowArray(projects);
      case "Technology":
        return Module.transformTechRowArray(allTechnologies);
      default:
        return [["no tab matches value"]];
    }
  }

  function headers(): string[] {
    switch (value) {
      case "Projects":
        return ["Project Name", "Tech Stack"];
      case "Technology":
        return ["Skill Name"];
      default:
        return ["no tab matches value"];
    }
  }

  return (
    <>
      <div className="table-container">
        <PageViewHeader
          pageTitle="Management"
          showPlus={false}
          isHeader={true}
          plusClicked={false}
        />
        {/* TODO: include Filter Component */}
        <ManagementTabs handleChange={handleChange} />
        {active === "Table" && (
          <div className="page-table">
            <CustomTableButton
              value={value}
              buttonStyle={buttonStyle}
              customHandleClick={toggleShowForm}
            />
            <CustomTableContainer
              headers={headers()}
              rows={fn()}
              headerStyle={headerStyle}
              rowStyle={rowStyle}
              cellStyle={cellStyle}
              customHandleSelection={customHandleSelection}
              skill={skill}
              value={value}
              toggleShowForm={toggleShowForm}
              buttonStyle={buttonStyle}
              setTechnology={handleTechnology}
              setSkill={setSkill}
            />
          </div>
        )}
        {active === "Form" && (
          <FormComponent
            title="Add Project"
            readonly={false}
            edit={false}
            selectedRow={""}
            technologies={technologies}
            handleProjectChange={handleProjectChange}
            handleClick={() => setActive("Table")}
            setTechnologies={setTechnologies}
            allTechnologies={allTechnologies}
          />
        )}
        {active === "Details" && (
          <FormComponent
            title="Project Details"
            readonly={true}
            edit={true}
            selectedRow={selectedRow}
            technologies={technologies}
            handleProjectChange={handleProjectChange}
            handleClick={() => setActive("Table")}
            handleEdit={() => setActive("Edit")}
            allTechnologies={allTechnologies}
          />
        )}
        {active === "Edit" && (
          <FormComponent
            title="Edit Project"
            readonly={false}
            edit={false}
            selectedRow={selectedRow}
            technologies={technologies}
            handleProjectChange={handleProjectChange}
            handleClick={() => setActive("Table")}
            setTechnologies={setTechnologies}
            allTechnologies={allTechnologies}
          />
        )}
      </div>
    </>
  );
}
