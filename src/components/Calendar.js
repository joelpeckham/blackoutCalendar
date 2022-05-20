import "./Calendar.css";
import Goo from "./Goo.tsx";
import React from "react";
function Calendar({ year, month, className }) {
  const gridUnit = 14.2857142857;

  const [blackedOut, setBlackedOut] = React.useState({});

  function addBlackedOut(keyValue) {
    let newBlackedOut = blackedOut;
    let gridX = gridUnit / 2 + (keyValue % 7) * gridUnit + "%";
    let gridY = (gridUnit * 3) / 2 + Math.floor(keyValue / 7) * gridUnit + "%";
    let newCircle = (
      <circle
        key={"blob" + keyValue}
        cx={gridX}
        cy={gridY}
        fill="black"
        r="1.35em"
        style={{ animation: animationString(), transformOrigin: `${gridX} ${gridY}` }}
      />
    );
    newBlackedOut[keyValue] = newCircle;
    setBlackedOut({ ...newBlackedOut });
  }

  const englishMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let numberGrid = [];

  let startDate = new Date(year, month, 1 - firstDayOfMonth);
  let currentDate = new Date(startDate);

  for (let i = 0; i < 6 * 7; i++) {
    let day = currentDate.getDate();
    currentDate.setDate(day + 1);
    let active =
      i < firstDayOfMonth || i >= firstDayOfMonth + daysInMonth
        ? "__Calendar_Grid_Inactive"
        : "__Calendar_Grid_Active";
    // Check if date is blacked out
    let blackedOutName = blackedOut[i] ? " __Calendar_Grid_BlackedOut" : "";
    let className =
      "__Calendar_Grid_Item __Calendar_Grid_Num " + active + blackedOutName;
    numberGrid.push({ className: className, day: day, keyValue: i });
  }

  const animationString = () => {
    let duration = Math.random() * (30 - 20) + 20;
    let delay = Math.random() * 3;
    let duration2 = Math.random() * (30 - 20) + 20;
    let delay2 = Math.random() * 3;
    return `shake ${duration}s ease ${delay}s infinite, breathe ${duration2}s ease ${delay2}s infinite, scale_in 0.5s ease 1`;
  };

  return (
    <div className={className + " __Calendar"}>
      <header className="__Calendar_Header">
        <h1>{englishMonthNames[month]}</h1>
      </header>
      <div className="__Calendar_Body">
        <div className="__Calendar_Grid">
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">M</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">T</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">W</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">T</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">F</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>
          {numberGrid.map((gridItem) => (
            <p
              className={gridItem.className}
              key={gridItem.keyValue}
              onClick={() => {
                addBlackedOut(gridItem.keyValue);
              }}
            >
              {gridItem.day}
            </p>
          ))}
        </div>
        <div className="__Calendar_Metaballs">
          <Goo className="__Calendar_Goo">
            <svg style={{ filter: "blur(0.6em)" }}>
              {Object.values(blackedOut)}
            </svg>
          </Goo>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
