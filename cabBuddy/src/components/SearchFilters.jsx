import React, { useState, useEffect } from "react";

export default function SearchFilters({
  initialSort = null,
  timeCounts = { before06: 8, sixTo12: 37, twelveTo18: 29 },
  onChange = () => {},
}) {
  const [sortBy, setSortBy] = useState(initialSort);

  const [times, setTimes] = useState({
    before06: false,
    sixTo12: false,
    twelveTo18: false,
  });

  useEffect(() => {
    onChange({ sort: sortBy, times });
  }, [sortBy, times, onChange]);

  const handleSortChange = (value) => setSortBy(value);

  const handleTimeToggle = (key) =>
    setTimes((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleClearAll = () => {
    setSortBy(null);
    setTimes({ before06: false, sixTo12: false, twelveTo18: false });
  };

  return (
    <aside className="w-full max-w-xs bg-white rounded-lg p-4 text-sm">
      {/* Sort Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-900 tracking-wide">
          Sort by
        </h3>
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Clear all
        </button>
      </div>

      {/* Sort Options */}
      <div className="space-y-2 mb-5">
        {/* --- EARLIEST DEPARTURE --- */}
        <SortRow
          id="sort-earliest"
          checked={sortBy === "earliest"}
          onChange={() => handleSortChange("earliest")}
          label="Earliest departure"
        >
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l3 3"
            />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </SortRow>

        {/* --- LOWEST PRICE --- */}
        <SortRow
          id="sort-lowest"
          checked={sortBy === "lowest_price"}
          onChange={() => handleSortChange("lowest_price")}
          label="Lowest price"
        >
          <svg
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              d="M3 7l9-4 9 4-9 4-9-4z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12l9 4 9-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 17l9 4 9-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SortRow>

        {/* --- CLOSE TO DEPARTURE --- */}
        <SortRow
          id="sort-close-departure"
          checked={sortBy === "close_departure"}
          onChange={() => handleSortChange("close_departure")}
          label="Close to departure point"
        >
          {/* <svg
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
          >
            <circle cx="12" cy="4" r="2" />
            <path d="M9 20l2-6 2-1 2 7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 10l2-1 2 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg> */}

          {/* <svg
  className="w-5 h-5 text-blue-600"
  viewBox="0 0 24 24"
  fill="none"
  strokeWidth="2"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="3.5" r="1.6" />
  <path d="M12 6.5v2.3" />
  <path d="M10.2 8.6l-1.2 2.6" />
  <path d="M13.5 8.2l1.4 1" />
  <path d="M11 11.2l-1.6 4" />
  <path d="M13 11.6l1.6 4.2" />
</svg> */}

          <svg
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2c2.8 0 5 2.2 5 5 0 4-5 9.5-5 9.5S7 11 7 7c0-2.8 2.2-5 5-5z" />
            <circle cx="12" cy="7.2" r="1.2" />
            <path d="M12 8.6v1.6" />
            <path d="M11 10.6l-0.8 1.8" />
            <path d="M13 10.6l0.8 1.8" />
            <path d="M12 9.4l0.9 0.7" />
          </svg>
        </SortRow>

        {/* --- CLOSE TO ARRIVAL --- */}
        <SortRow
          id="sort-close-arrival"
          checked={sortBy === "close_arrival"}
          onChange={() => handleSortChange("close_arrival")}
          label="Close to arrival point"
        >
          {/* <svg
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6l3 2" />
            <circle cx="6" cy="18" r="3" />
            <path d="M9 20l2-6 2-1 2 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg> */}

          <svg
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2c2.8 0 5 2.2 5 5 0 4-5 9.5-5 9.5S7 11 7 7c0-2.8 2.2-5 5-5z" />
            <circle cx="12" cy="7.2" r="1.2" />
            <path d="M12 8.6v1.6" />
            <path d="M11 10.6l-0.8 1.8" />
            <path d="M13 10.6l0.8 1.8" />
            <path d="M12 9.4l0.9 0.7" />
          </svg>
        </SortRow>

        {/* --- SHORTEST RIDE --- */}
        <SortRow
          id="sort-shortest"
          checked={sortBy === "shortest"}
          onChange={() => handleSortChange("shortest")}
          label="Shortest ride"
        >
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              d="M6 4h12M6 20h12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 4c2 3 6 3 8 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 20c2-3 6-3 8 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SortRow>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Departure time header */}
      <h4 className="text-lg font-bold text-blue-900 tracking-wide mb-3">
        Departure time
      </h4>

      {/* Time filters */}
      <div className="space-y-2">
        <TimeRow
          label="Before 06:00"
          count={timeCounts.before06}
          checked={times.before06}
          onToggle={() => handleTimeToggle("before06")}
        />

        <TimeRow
          label="06:00 - 12:00"
          count={timeCounts.sixTo12}
          checked={times.sixTo12}
          onToggle={() => handleTimeToggle("sixTo12")}
          highlighted
        />

        <TimeRow
          label="12:01 - 18:00"
          count={timeCounts.twelveTo18}
          checked={times.twelveTo18}
          onToggle={() => handleTimeToggle("twelveTo18")}
        />
      </div>
    </aside>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function SortRow({ id, checked, onChange, label, children }) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer 
      ${checked ? "bg-blue-50" : "hover:bg-gray-50"}`}
    >
      <div className="flex items-center gap-3">
        {/* Radio */}
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center border-[2.5px] ${
            checked ? "border-blue-500" : "border-blue-300"
          }`}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          )}
        </div>

        <span className="text-[15px] font-medium text-gray-900">{label}</span>
      </div>

      <div className="text-blue-600">{children}</div>

      <input
        id={id}
        type="radio"
        name="sort"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

function TimeRow({ label, count, checked, onToggle, highlighted }) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer 
      ${highlighted ? "bg-blue-50" : "hover:bg-gray-50"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-md border-[2.5px] flex items-center justify-center ${
            checked ? "border-blue-600 bg-blue-500" : "border-blue-600"
          }`}
        >
          {checked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
        </div>

        <span className="text-[15px] font-medium text-gray-900">{label}</span>
      </div>

      <span className="text-sm font-semibold text-gray-600">{count}</span>
    </div>
  );
}
