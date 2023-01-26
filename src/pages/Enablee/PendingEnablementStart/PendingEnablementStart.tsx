import "./PendingEnablementStart.css";
import { GenerateRows } from "../../../components/GenerateRows/GenerateRows";

export default function PendingEnablement() {
  return (
    <>
      <div className="page-section">
        <GenerateRows pageNum={-1} />
      </div>
    </>
  );
}
