import Calendar from "./Calendar";
import './CalendarCarousel.css';
import React from "react";

function CalendarCarousel(props : any) {
  let dates : {month:Number, year:Number}[] = props.dates;
  return (
    <div className="__Calendar_Carousel">
      {dates.map((date, index) => (<Calendar key={index} month={date.month} year={date.year} className={"__Carousel_Calendar"} target={undefined}/>))}
    </div>
  );
}

export default CalendarCarousel;