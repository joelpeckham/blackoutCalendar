import "./Calendar.css";
import Goo from "./Goo.tsx";
import React from "react";
import { isSafari } from "react-device-detect";

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

const gridUnit = 14.2857142857;

function Calendar({ year, month, className, target }) {
  const [mouseState, setMouseState] = React.useState("up");
  const [deleteState, setDeleteState] = React.useState(false);
  const [blackedOut, setBlackedOut] = React.useState({}); //Map of keyValue to bool

  function handleGooification(e) {
    if (!e.target.className.includes("__Calendar_Grid_Active")) return;
    const keyValue = e.target.getAttribute("id");
    if (blackedOut[keyValue] && deleteState) {
      blackedOut[keyValue] = false;
    } else if (!blackedOut[keyValue] && !deleteState) {
      blackedOut[keyValue] = true;
    }
    setBlackedOut({ ...blackedOut });
  }

  function gridMouseDown(e) {
    if (e.target.className.includes("__Calendar_Grid_BlackedOut")) {
      setDeleteState(true);
    } else {
      setDeleteState(false);
    }
    setMouseState("down");
    handleGooification(e);
  }
  function gridMouseMove(e) {
    if (mouseState === "down") {
      handleGooification(e);
    }
  }
  function gridMouseUp(e) {
    setMouseState("up");
  }

  function makeGooBlob(keyValue, radius = 1.35) {
    const gridX = gridUnit / 2 + (keyValue % 7) * gridUnit + "%";
    const gridY =
      (gridUnit * 3) / 2 + Math.floor(keyValue / 7) * gridUnit + "%";
    const visibility = !blackedOut[keyValue] ? "inVisible" : "isVisible";

    const animationChoice = (keyValue % 8) + 1;
    const animationClass = !isSafari ? `pulse${animationChoice}` : "";

    let gooStyle = {
      backgroundColor: "black",
      borderRadius: `${radius}em`,
      position: "absolute",
    };
    if (isSafari) {
      gooStyle = { ...gooStyle, transition: "none" };
    }

    return (
      <div
        className={`__gooCircle_continer `}
        key={keyValue}
        style={{
          width: `${radius * 2}em`,
          height: `${radius * 2}em`,
          position: "absolute",
          left: `calc(${gridX} - ${radius}em)`,
          top: `calc(${gridY} - ${radius}em)`,
        }}
      >
        <div
          className={`__gooCircle ${visibility} ${animationClass} `}
          style={gooStyle}
        ></div>
      </div>
    );
  }

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let numberGrid = [];
  let gooGrid = [];

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
    const isblackedOut = blackedOut[i] ? " __Calendar_Grid_BlackedOut" : "";
    if (active === "__Calendar_Grid_Active" && day === target) {
      active += " __Calendar_Grid_Target";
    }
    let className =
      "__Calendar_Grid_Item __Calendar_Grid_Num " + active + isblackedOut;
    numberGrid.push({ className: className, day: day, keyValue: i });
    gooGrid.push(makeGooBlob(i));
  }

  React.useEffect(() => {
    if (isSafari) {
      let parent = document.getElementsByClassName("__Calendar")[0];
      parent.style.opacity = "99.9%";
      const timeout = setTimeout(() => {
        parent.style.opacity = "100%";
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [blackedOut]);

  return (
    <div className={className + " __Calendar"}>
      <header className="__Calendar_Header">
        <h1>{englishMonthNames[month]}</h1>
      </header>
      <div className="__Calendar_Body">
        <div
          className={"__Calendar_Grid "}
          onMouseDown={gridMouseDown}
          onMouseMove={gridMouseMove}
          onMouseUp={gridMouseUp}
          onMouseLeave={gridMouseUp}
        >
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>
          <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">M</p>
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
          <Goo className="__Calendar_Goo" intensity="none">
            <div
              style={{ filter: "blur(0.5em)", width: "100%", height: "100%" }}
            >
              {[...gooGrid]}
            </div>
          </Goo>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
