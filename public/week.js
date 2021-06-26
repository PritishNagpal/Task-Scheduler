let nav = 0;
let mon = 0;

const nextButton = document.getElementById("nextButton");
const calendar = document.getElementById("calendar");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekSchedule = (day, month, year) => {
  const d = day <= 9 ? `0${day}` : `${day}`;
  const m = month <= 9 ? `0${month}` : `${month}`;
  const date = `${year}-${m}-${d}`;
  fetch(`/getWeek/${date}`, { method: "GET" }).then((res) => {
    res.json().then((result) => {
      console.log(result);
      const events = Array.from(result.results);
      console.log(events);
      events.forEach((event) => {
        const { teacher_name, batch_name, start_time, end_time, task, date } =
          event;
        const dateArray = date.split("-");

        const li = document.createElement("li");
        const divBlock = document.createElement("div");
        divBlock.className = "time";
        divBlock.innerHTML = `<h2>${dateArray[2]}<span>July</span></h2>`;

        const divBlockS = document.createElement("div");
        divBlockS.className = "details";
        divBlockS.innerHTML = `<h3>${task}<h3><h4>Teacher&nbsp&nbsp${teacher_name}</h4><h4>Batch&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${batch_name}</h4>
        <h4>${start_time}&nbsp&nbsp&nbsp&nbsp&nbsp${end_time}</h4>`;
        li.appendChild(divBlock);
        li.appendChild(divBlockS);
        const ul = document.querySelector("ul");
        ul.appendChild(li);
      });
    });
  });
};

const dt = new Date();
const month = dt.getMonth() + 1; // month ka count
const year = dt.getFullYear(); // year count
let daysInPrevMonth = new Date(year, month - 1, 0).getDate(); //prev month days count -> 30/31
let daysInMonth = new Date(year, month, 0).getDate(); //current month ka day count
let monthsPassed = daysInMonth; // -> month ka increment
let monthsPass = 0; // month count!
function load() {
  const firstDayOfWeek = dt.getDate() - dt.getDay(); // is used to increasing dates on click of next
  //   console.log(daysInMonth);
  calendar.innerHTML = "";
  for (let i = firstDayOfWeek; i <= firstDayOfWeek + 6; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    let num = i;
    daySquare.innerText = num;
    const twoD = num <= 9 ? `0${num}` : `${num}`;
    const twoM = month <= 9 ? `0${month}` : `${month}`;
    daySquare.addEventListener("click", () => {
      window.location = `/${twoD}-${twoM}-${year}`;
    });
    calendar.appendChild(daySquare);
  }

  getWeekSchedule(firstDayOfWeek, month, year);
}

load();
