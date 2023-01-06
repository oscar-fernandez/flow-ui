import { useState } from "react";
import "./DatepickerComponent.css";
import DatePicker from "react-datepicker";

export const DatepickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

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
      />
    </div>
  );
};
