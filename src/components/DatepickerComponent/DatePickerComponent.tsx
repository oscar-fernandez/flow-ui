import "./DatepickerComponent.css";
import DatePicker from "react-datepicker";
import { useEffect } from "react";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
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
        maxDate={endDate}
        excludeDates={[new Date(endDate!)]}
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
        excludeDates={[new Date(startDate!)]}
        // selectsRange
        minDate={startDate}
        dateFormat="MMMM d, yyyy"
        placeholderText="No End Date Selected"
      />
    </div>
  );
};
