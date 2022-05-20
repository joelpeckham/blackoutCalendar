import "./Calendar.css";

function Calendar({ year, month }) {
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

  let bodyGrid = [
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>,
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">M</p>,
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">T</p>,
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">W</p>,
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">T</p>,
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">F</p>,
    <p className="__Calendar_Grid_Item __Calendar_Grid_Col_Label">S</p>,
  ];

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
    bodyGrid.push(<p className={className}>{day}</p>);
  }

  return (
    <div className="__Calendar">
      <header className="__Calendar_Header">
        <h1>{englishMonthNames[month]}</h1>
      </header>
      <div className="__Calendar_Body">{bodyGrid}</div>
    </div>
  );
}
export default Calendar;