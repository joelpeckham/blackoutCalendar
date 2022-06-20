import { Calendar } from "./Calendar";
import "./CalendarCarousel.css";
import React from "react";

function CalendarCarousel(props: any) {
  let dates = props.dates;
  let [centerIndex, setCenterIndex] = React.useState(props.initialCenter);
  let visibleRangeStart = centerIndex - 1 >= 0 ? centerIndex -1 : 0;
  let visibleRangeEnd = centerIndex + 1 < dates.length ? centerIndex + 1 : dates.length -1;
  let cals = []
  for (let i = 0; i < dates.length; i++) {
    let date = dates[i];
    let visibleClass = i >= visibleRangeStart && i <= visibleRangeEnd ? "__Carousel_Calendar_Visible" : "__Carousel_Calendar_Invisible";
    cals.push(
      <div className="__Carousel_Calendar_Container" key={i}>
        <Calendar
          month={date.month}
          year={date.year}
          className={`__Carousel_Calendar`}
          target={undefined}
        />
      </div>
    );
  }
  
  function moveLeft(){
    if (centerIndex > 1) setCenterIndex(centerIndex -1);
  }
  function moveRight(){
    if (centerIndex < dates.length -2) setCenterIndex(centerIndex +1);
  }

  return (
    <div className="__Calendar_Carousel">
      <div className="__Calendar_Carousel_Left_Arrow __Calendar_Carousel_Arrow">
        <div className="arrow" onClick={moveLeft}>
          <div className="arrow-top"></div>
          <div className="arrow-bottom"></div>
        </div>
      </div>
      <div className="__Calendar_Carousel_Cal_Holder">{cals}</div>
      <div className="__Calendar_Carousel_Right_Arrow __Calendar_Carousel_Arrow">
        <div className="arrow" onClick={moveRight}>
          <div className="arrow-top"></div>
          <div className="arrow-bottom"></div>
        </div>
      </div>
    </div>
  );
}

export default CalendarCarousel;
