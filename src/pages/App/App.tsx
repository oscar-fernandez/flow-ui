import PageContainer from "../PageContainer/PageContainer";
import "./App.css";
import TableComponent from "../../components/Table/TableComponent";
import { MockData, MockRows } from "../../data/MockData";
import PodAssignment from "../PodAssignment/PodAssignment";

function App() {
  return (
    <>
      <PageContainer />
      {/* <PodAssignment/> */}
      {/* <TableComponent columns = {MockData} rows = {MockRows}/> */}
    </>
  );
}

export default App;
