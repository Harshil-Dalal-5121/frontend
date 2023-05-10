import React, { useState } from "react";
import "./App.css";

let today = new Date();
let currYear = today.getFullYear();
let currMonth = today.getMonth();
let getDate = today.getDate();
const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Ju",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function Cal() {
  const [month, setMonth] = useState(currMonth);
  const [year, setYear] = useState(currYear);
  const [todaysDate, setTodaysDate] = useState(getDate);

  const datesArray = (month, year) => {
    let ans = [];

    for (let i = 0; i < 7; i++) {
      ans.push(day[i]);
    }

    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = new Date(year, month).getDay();

    let dayInWeek = 7;
    let date = 1;
    for (let i = 0; i < (lastDayOfMonth + startingDay) / 7; i++) {
      for (let j = 0; j < dayInWeek; j++) {
        if (i === 0 && j < startingDay) {
          ans.push(" ");
        } else if (date < lastDayOfMonth + 1) {
          ans.push(date);
          date++;
        } else {
          ans.push(" ");
        }
      }
    }
    return ans;
  };
  const nextMonth = () => {
    setYear(month === 11 ? year + 1 : year);
    setMonth(month === 11 ? 0 : month + 1);
  };

  const prevMonth = () => {
    setYear(month === 0 ? year - 1 : year);
    setMonth(month === 0 ? 11 : month - 1);
  };

  const handleChangeDate = (date) => {
    setTodaysDate(date);
  };

  const handleMonth = (month) => {
    setMonth(month);
  };

  const handleYear = (year) => {
    if (year.length < 4) {
      alert("Year should be in four digit");
    }
    setYear(year);
  };

  return (
    <>
      <h1>Calendar view</h1>
      <div className="navigation">
        <div>
          <button className="btn" onClick={prevMonth}>
            &lt;
          </button>
          <span className="title">
            {todaysDate + " " + monthArray[month] + " ," + year}
          </span>
          <button className="btn" onClick={nextMonth}>
            &gt;
          </button>
        </div>

        <div className="input">
          <select className="inp" onChange={(e) => handleMonth(e.target.value)}>
            <option value="">Choose month</option>
            {monthArray.map((m, idx) => {
              return (
                <option key={m} value={idx}>
                  {m}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="year"
            placeholder="Enter Year "
            className="inp"
            onChange={(e) => handleYear(e.target.value)}
          />
        </div>
      </div>

      <div className="calendar">
        <ul id="days">
          {datesArray(month, year).map((date, i) => {
            return (
              <li key={i} id="date" onClick={() => handleChangeDate(date)}>
                {date}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Cal;
