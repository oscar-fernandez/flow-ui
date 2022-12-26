import IEnablee from "../../models/interfaces/IEnablee"
import IProject from "../../models/interfaces/IProject"
import ITechnology from "../../models/interfaces/ITechnology";
import { convertToStringArr } from "../../utils/utilityFunctions"

const tabLabels = ["Projects", "Technology", "Grade", "Country", "Community"];

function convertTechArToStr (ar: ITechnology[]) : string {
    return convertToStringArr(ar).join(", "); 
}

const transformEnableeArray = (ar : IEnablee[]) : string[][] => ar.map(e => enableeRowfactory(e))

const enableeRowfactory = (obj : IEnablee) : string[] => {
    return [
      obj.employeeId.toString(),
      obj.firstName,
      obj.lastName,
      convertTechArToStr(obj.technology),
      obj.enablementStartDate,
      obj.enablementEndDate
    ]
  }

const transformProjectRowArray = (ar: IProject[]) : string[][] => ar.map(e => projectRowfactory(e))
  
const projectRowfactory = (obj : IProject) : string[] => {
      return [
        obj.name,
        convertTechArToStr(obj.technology)
      ]
}

const transformTechRowArray = (ar: ITechnology[]) : string[][] => ar.map(e => techRowFactory(e))
  
const techRowFactory = (obj : ITechnology) : string[] => {
      return [
        obj.name,
      ]
}

  export {transformEnableeArray, transformProjectRowArray, transformTechRowArray, tabLabels}