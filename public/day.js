const dt = new Date();
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();
const monthName = [
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

const dayButton = document.querySelector("#dayButton");
const dateDisplay = document.querySelector(".hidden").innerText;

const twoDigitDay = day <= 9 ? `0${day}` : `${day}`;
const twoDigitMonth = month + 1 <= 9 ? `0${month + 1}` : `${month + 1}`;
const date = { d: `${year}-${twoDigitMonth}-${twoDigitDay}` };

const main = document.querySelector(".flex");
const btn = document.querySelector("#btn");

const dropDownTeacher = document.querySelector(".drop-teacher");
const dropDownBatch = document.querySelector(".drop-batch");
const updateBtn = document.querySelector("#updateBtn");

const batchName = document.querySelector("#batch_name");
const teacherName = document.querySelector("#teacher_name");
const updateteacherdropDown = document.querySelector("#newTName");
const updateBatchDropDown = document.querySelector("#newBName");

displayTeacherName(dropDownTeacher);
displayTeacherName(teacherName);
displayTeacherName(updateteacherdropDown);

displayBatchName(dropDownBatch);
displayBatchName(batchName);
displayBatchName(updateBatchDropDown);

displayEvents("All", "All");
filter();

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

document.querySelector(".weekBtn").addEventListener("click", () => {
  window.location = "/week";
});
document.querySelector(".monthBtn").addEventListener("click", () => {
  window.location = "/week";
});
