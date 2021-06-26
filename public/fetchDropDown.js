// Fetches all teacher names
const displayTeacherName = (dropDown) => {
  fetch("/available_teacher", { method: "GET" })
    .then((res) => {
      res.json().then((results) => {
        results.forEach((result) => {
          const option = document.createElement("option");
          option.value = result;
          option.innerText = result;
          dropDown.appendChild(option);
        });
      });
    })
    .catch((e) => console.log(e));
};

// Fetches all batches names

const displayBatchName = (dropDown) => {
  fetch("/available_batch", { method: "GET" })
    .then((res) => {
      res.json().then((results) => {
        // console.log("YUp");
        results.forEach((result) => {
          const option = document.createElement("option");
          option.value = result;
          option.innerText = result;
          dropDown.appendChild(option);
        });
      });
    })
    .catch((e) => console.log(e));
};
