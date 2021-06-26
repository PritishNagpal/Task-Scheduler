const filter = () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", () => {
    const a = Array.from(main);
    document.querySelectorAll(".temp").forEach((e) => e.remove());
    const name = document.querySelector(".drop-teacher").value;
    const batch = document.querySelector(".drop-batch").value;
    displayEvents(name, batch);
  });
};
