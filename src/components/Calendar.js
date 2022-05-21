import "./Calendar.css";
import Goo from "./Goo.tsx";
import React from "react";
function Calendar({ year, month, className, target }) {
  const gridUnit = 14.2857142857;

  const [blackedOut, setBlackedOut] = React.useState({});
  let targetKey = null;

  function addBlackedOut(keyValue) {
    let newBlackedOut = blackedOut;
    let gridX = gridUnit / 2 + (keyValue % 7) * gridUnit + "%";
    let gridY = (gridUnit * 3) / 2 + Math.floor(keyValue / 7) * gridUnit + "%";
    let fillColor = keyValue === targetKey ? "black" : "black";
    let newCircle = (
      <circle
        key={"blob" + keyValue}
        cx={gridX}
        cy={gridY}
        fill={fillColor}
        r="1.35em"
        style={{
          animation: animationString(),
          transformOrigin: `${gridX} ${gridY}`,
        }}
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
    if (active === "__Calendar_Grid_Active" && day === target) {
      active += " __Calendar_Grid_Target";
      targetKey = i;
    }
    let blackedOutName = blackedOut[i] ? " __Calendar_Grid_BlackedOut" : "";
    let className =
      "__Calendar_Grid_Item __Calendar_Grid_Num " + active + blackedOutName;
    numberGrid.push({ className: className, day: day, keyValue: i });
  }

  const animationString = () => {
    let duration = Math.random() * (30 - 20) + 20;
    let delay = Math.random();
    let duration2 = Math.random() * (30 - 20) + 20;
    let delay2 = Math.random();
    return `shake ${duration}s ease ${delay}s infinite, breathe ${duration2}s ease ${delay2}s infinite, scale_in 0.3s ease-in-out 1`;
  };

  const [mouseState, setMouseState] = React.useState("up");
  const [deleteState, setDeleteState] = React.useState(false);

  function handleGoo(keyValue) {
    if (!deleteState) {
      addBlackedOut(keyValue);
    } else {
      delete blackedOut[keyValue];
      setBlackedOut({ ...blackedOut });
    }
  }
  function gridMouseDown(e) {
    setMouseState("down");
    let targetClassList = e.target.classList;
    if (
      targetClassList.contains("__Calendar_Grid_Num") &&
      targetClassList.contains("__Calendar_Grid_Active")
    ) {
      let targetKey = e.target.getAttribute("id");
      setDeleteState(blackedOut[targetKey] ? true : false);
      handleGoo(targetKey);
    }
  }
  function gridMouseMove(e) {
    if (mouseState === "down") {
      let targetClassList = e.target.classList;
      if (
        targetClassList.contains("__Calendar_Grid_Num") &&
        targetClassList.contains("__Calendar_Grid_Active")
      ) {
        let targetKey = e.target.getAttribute("id");
        handleGoo(targetKey);
      }
    }
  }
  function gridMouseUp(e) {
    setMouseState("up");
  }

  return (
    <div className={className + " __Calendar"}>
      <header className="__Calendar_Header">
        <h1>{englishMonthNames[month]}</h1>
      </header>
      <div className="__Calendar_Body">
        <div
          className="__Calendar_Grid"
          onMouseDown={gridMouseDown}
          onMouseMove={gridMouseMove}
          onMouseUp={gridMouseUp}
          onMouseLeave={gridMouseUp}
        >
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
              id={gridItem.keyValue}
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
