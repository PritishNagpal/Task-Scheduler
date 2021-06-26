// Updates schedule
const updateData = (prevData, newData, ST, ET) => {
  const data = {
    prevData,
    newData,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(ST.innerText, ET);

  fetch(`/update/${dateDisplay}`, options);
};
