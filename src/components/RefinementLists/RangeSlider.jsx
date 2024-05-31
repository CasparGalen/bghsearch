import { useEffect, useState } from "react";
import { useRange } from 'react-instantsearch';

export function RangeSlider(props) {
  const { start, range, canRefine, refine } = useRange(props);
  const [values, setValues] = useState([range.min, range.max]);

  const formatDate = timestamp => new Date(timestamp * 1000).toISOString().substr(0, 10);
  const parseDate = dateStr => {
    const timestamp = new Date(dateStr).getTime() / 1000;
    return isNaN(timestamp) ? null : timestamp;
  };

  const [startValue, setStartValue] = useState(formatDate(values[0]));
  const [endValue, setEndValue] = useState(formatDate(range.max)); // End date set to range.max
  const [selectedRange, setSelectedRange] = useState(null);

  useEffect(() => {
    if (start) {
      const [minStart, maxStart] = start;
      const minFinite = minStart === -Infinity ? range.min : minStart;
      const maxFinite = maxStart === Infinity ? range.max : maxStart;
      setValues([Math.max(minFinite, range.min), Math.min(maxFinite, range.max)]);
      setStartValue(formatDate(Math.max(minFinite, range.min)));
      setEndValue(formatDate(Math.min(maxFinite, range.max)));
    }
  }, [start, range.min, range.max]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (canRefine) {
        refine(values);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [values, canRefine, refine]);

  const handleInputChange = (inputType, value) => {
    let timestamp = parseDate(value);
    if (timestamp === null) {
      return;
    }

    if (inputType === "start") {
      if (timestamp > values[1]) {
        timestamp = values[1];
      }
      setStartValue(formatDate(timestamp));
      setValues([timestamp, values[1]]);
    } else {
      if (timestamp < values[0]) {
        timestamp = values[0];
      }
      if (timestamp > range.max) {
        timestamp = range.max;
      }
      setEndValue(formatDate(timestamp));
      setValues([values[0], timestamp]);
    }
  };

  const handleRangeSelect = (months) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - months);
    const startTimestamp = currentDate.getTime() / 1000;

    setSelectedRange(months);
    setStartValue(formatDate(startTimestamp));
    setValues([startTimestamp, parseDate(endValue)]);
    refine([startTimestamp, parseDate(endValue)]);
  };

  const buttonOptions = [
    { label: "3 Monate", value: 3 },
    { label: "1 Jahr", value: 12 },
    { label: "3 Jahre", value: 36 }
  ];

  return (
    <div>
      <div className="button-container">
        <p>Letzte</p>
        {buttonOptions.map(option => {
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - option.value);
          const startTimestamp = currentDate.getTime() / 1000;
          const isDisabled = startTimestamp < range.min;

          return (
            <button
              key={option.value}
              onClick={() => handleRangeSelect(option.value)}
              disabled={!canRefine || isDisabled}
              className={`button-rangeslider ${selectedRange === option.value ? 'selected' : ''}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div className="start-date-label pt-4 pb-2">
        <label className="pr-[5px]">Von: </label>
        <input
          className="input-field input date-picker"
          type="date"
          value={startValue}
          onChange={(e) => handleInputChange("start", e.target.value)}
          onBlur={() => handleInputChange("start", startValue)}
          disabled={!canRefine}
          min={formatDate(range.min)}
          max={endValue} // Set max to the current end value
        />
      </div>
      <div className="end-date-label">
        <label className="pr-[12px]">Bis: </label>
        <input
          className="input-field input date-picker"
          type="date"
          value={endValue}
          onChange={(e) => handleInputChange("end", e.target.value)}
          onBlur={(e) => handleInputChange("end", endValue)}
          disabled={!canRefine}
          min={startValue} // Set min to the current start value
          max={formatDate(range.max)} // Set max to the range max
        />
      </div>
    </div>
  );
}
