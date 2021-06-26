// Drag and drop feature to delete schedule
const dragAndDrop = (element, event, events) => {
  element.addEventListener("dragend", () => {
    element.className = "flex-item";
  });

  const deleteButton = document.querySelector(".dragDel");
  deleteButton.addEventListener("dragenter", (e) => {
    e.preventDefault();
    deleteButton.className = "fas fa-trash-alt cursor hovered";
    console.log("enter");
  });
  deleteButton.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  deleteButton.addEventListener("dragleave", (e) => {
    e.preventDefault();
    deleteButton.className = "fas fa-trash-alt cursor dragDel";
    console.log("leave");
  });
  deleteButton.addEventListener("drop", () => {
    deleteData(event, element);
    deleteButton.className = "fas fa-trash-alt cursor dragDel";
    console.log("drop");
  });
};

// Delete By clicking Icon
const deleteData = (event, divBlock) => {
  main.removeChild(divBlock);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };

  fetch("/deleteEvent", options);
};
