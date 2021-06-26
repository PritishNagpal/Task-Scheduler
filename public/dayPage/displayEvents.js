const displayEvents = (name, batch) => {
  fetch(`/getEvents/${name}/${batch}/${dateDisplay}`, {
    method: "Get",
  }).then((res) => {
    res.json().then((result) => {
      const events = Array.from(result.results);

      events.forEach((event) => {
        const { teacher_name, batch_name, start_time, end_time, task } = event;
        const divBlock = document.createElement("div");
        divBlock.className = "flex-item temp";
        const Tname = document.createElement("div");
        Tname.className = "flex-sub-item";
        Tname.innerText = teacher_name;
        divBlock.appendChild(Tname);

        const Bname = document.createElement("div");
        Bname.className = "flex-sub-item";
        Bname.innerText = batch_name;
        divBlock.appendChild(Bname);

        const ST = document.createElement("div");
        ST.className = "flex-sub-item";
        ST.innerText = start_time;
        divBlock.appendChild(ST);

        const ET = document.createElement("div");
        ET.className = "flex-sub-item";
        ET.innerText = end_time;
        divBlock.appendChild(ET);

        const Task = document.createElement("div");
        Task.className = "flex-sub-item";
        Task.innerText = task;
        divBlock.appendChild(Task);

        const delD = document.createElement("div");
        const del = document.createElement("i");
        delD.className = "flex-sub-item";
        del.className = "fas fa-trash-alt cursor";
        delD.appendChild(del);
        divBlock.appendChild(delD);

        const editD = document.createElement("div");
        const edit = document.createElement("i");
        editD.className = "flex-sub-item";
        edit.className = "fas fa-pencil-alt cursor";
        editD.appendChild(edit);

        divBlock.appendChild(editD);

        main.appendChild(divBlock);
        const modalBg = document.querySelector(".modal-bg");
        const modalClose = document.querySelector(".modal-close");

        edit.addEventListener("click", () => {
          modalBg.classList.add("bg-active");

          updateBtn.addEventListener("click", () => {
            modalBg.classList.remove("bg-active");

            const prevData = {
              pTname: teacher_name,
              pBname: batch_name,
              pST: start_time,
              pET: end_time,
              pTask: task,
            };

            const nTname = document.querySelector("#newTName").value;
            const nBname = document.querySelector("#newBName").value;
            const nST = document.querySelector("#newST").value;
            const nET = document.querySelector("#newET").value;
            const nTask = document.querySelector("#newTask").value;
            if (nTname.length > 0) Tname.innerText = nTname;
            if (nBname.length > 0) Bname.innerText = nBname;
            if (nST.length > 0) ST.innerText = nST;
            if (nET.length > 0) ET.innerText = nET;
            if (nTask.length > 0) Task.innerText = nTask;
            const newData = {
              nTname,
              nBname,
              nST,
              nET,
              nTask,
            };
            updateData(prevData, newData, ST, ET);
          });
        });

        modalClose.addEventListener("click", () => {
          modalBg.classList.remove("bg-active");
        });

        del.addEventListener("click", () => {
          deleteData(event, divBlock);
        });
        divBlock.setAttribute("draggable", "true");
        divBlock.addEventListener("dragstart", () => {
          setTimeout(() => {
            divBlock.className += " hide";
          }, 10);
          dragAndDrop(divBlock, event, events);
          console.log("dragstart");
        });
      });
    });
  });
};
