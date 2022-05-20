import "./Calendar.css";

function Calendar({ year, month, className }) {
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
    let className = "__Calendar_Grid_Item __Calendar_Grid_Num " + active;
    numberGrid.push({ className: className, day: day, keyValue: "grid" + i });
  }

  return (
    <div className={className + " __Calendar"}>
      <header className="__Calendar_Header">
        <h1>{englishMonthNames[month]}</h1>
      </header>
      <div className="__Calendar_Body">
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">M</p>
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">T</p>
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">W</p>
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">T</p>
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">F</p>
        <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>
        {numberGrid.map((gridItem) => (
          <p className={gridItem.className} key={gridItem.keyValue}>
            {gridItem.day}
          </p>
        ))}
      </div>
    </div>
  );
}
export default Calendar;
