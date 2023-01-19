import "./DatepickerComponent.css";
import DatePicker from "react-datepicker";

interface Props {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export const DatepickerComponent = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  return (
    <div className="date-picker-container">
      <DatePicker
        className="date-picker"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        // selectsRange
        minDate={new Date()}
        dateFormat="MMMM d, yyyy -"
        placeholderText="No Start Date Selected"
      />
      <DatePicker
        className="date-picker"
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        // selectsRange
        minDate={startDate}
        dateFormat="MMMM d, yyyy"
        placeholderText="No End Date Selected"
      />
    </div>
  );
};
