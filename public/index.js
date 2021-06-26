let nav = 0;

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

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    const curDay = i - paddingDays;
    const twoDigitDay = curDay <= 9 ? `0${curDay}` : `${curDay}`;
    const twoDigitMonth = month + 1 <= 9 ? `0${month + 1}` : `${month + 1}`;
    daySquare.addEventListener("click", () => {
      window.location = `/${twoDigitDay}-${twoDigitMonth}-${year}`;
    });

    if (i > paddingDays) {
      const data = { day: i - paddingDays, month: month + 1, year: year };
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

initButtons();
load();

// modal code

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

const weekButton = document.querySelector("#weekButton");
const dayButton = document.querySelector("#dayButton");

const teacherName = document.querySelector("#teacher_name");
const batchName = document.querySelector("#batch_name");

const dt = new Date();
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();

const twoD = day <= 9 ? `0${day}` : `${day}`;
const twoM = month + 1 <= 9 ? `0${month + 1}` : `${month + 1}`;

displayTeacherName(teacherName);
displayBatchName(batchName);

dayButton.addEventListener("click", () => {
  window.location = `/${twoD}-${twoM}-${year}`;
});

weekButton.addEventListener("click", () => {
  window.location = "/week";
});
