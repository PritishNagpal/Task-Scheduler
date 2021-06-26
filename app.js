const express = require("express");
const app = express();

const connection = require("./database/db");

app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("month");
});

app.get("/week", (req, res) => {
  res.render("week");
});
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

app.post("/create", (req, res) => {
  const { teacher_name, batch_name, start_time, end_time, date, task } =
    req.body;
  const query = `select start_time, end_time from schedule where (teacher_name = '${teacher_name}' or batch_name = '${batch_name}') and date = '${date}'`;
  let array = [];

  connection.query(query, (err, result) => {
    for (let i = 0; i < result.length; i++) {
      array.push([result[i].start_time, result[i].end_time]);
    }
    let count;
    for (let i = 0; i < array.length; i++) {
      if (start_time >= result[i].start_time) {
        max_start = start_time;
      } else {
        max_start = result[i].start_time;
      }
      if (end_time <= result[i].end_time) {
        min_end = end_time;
      } else {
        min_end = result[i].end_time;
      }
      if (max_start < min_end) {
        count = 0;
        break;
      } else {
        count = 1;
      }
    }
    if (count == 1 || array.length == 0) {
      const query = `INSERT INTO schedule Values (NULL,'${teacher_name}', '${batch_name}', '${start_time}', '${end_time}', '${date}', '${task}')`;
      connection.query(query, (err, result) => {
        if (err) throw err;
      });
    }
  });
  res.redirect("/");
});

app.post("/teacher", (req, res) => {
  const { faculty_name } = req.body;
  if (faculty_name.length > 0) {
    const query = `INSERT INTO teacher Values ('${faculty_name}')`;
    connection.query(query, (err, result) => {
      if (err) throw err;
    });
  }
  res.redirect("/");
});

app.post("/batch", (req, res) => {
  const { batch_name } = req.body;
  if (batch_name.length > 0) {
    const query = `INSERT INTO batch Values ('${batch_name}')`;
    connection.query(query, (err, result) => {
      if (err) throw err;
    });
  }
  res.redirect("/");
});

app.get("/available_teacher", (req, res) => {
  const query = "SELECT * FROM teacher";
  connection.query(query, (err, results) => {
    if (err) throw err;
    let teacherArray = [];
    for (let i = 0; i < results.length; i++) {
      teacherArray.push(results[i].teacher_name);
    }
    res.send(teacherArray);
  });
});
app.get("/available_batch", (req, res) => {
  const query = "SELECT * FROM batch";
  connection.query(query, (err, results) => {
    if (err) throw err;
    let batchArray = [];
    for (let i = 0; i < results.length; i++) {
      batchArray.push(results[i].batch_name);
    }
    res.send(batchArray);
  });
});

app.get("/getEvents/:name/:batch/:date", (req, res) => {
  const { name, batch, date } = req.params;
  // console.log(req.params);
  let query;
  if (name == "All" && batch == "All")
    query = `SELECT teacher_name,batch_name,start_time,end_time,task  FROM schedule WHERE date = '${date}';`;
  else if (batch == "All")
    query = `SELECT teacher_name,batch_name,start_time,end_time,task  FROM schedule WHERE date = '${date}' AND teacher_name = '${name}';`;
  else if (name == "All")
    query = `SELECT teacher_name,batch_name,start_time,end_time,task  FROM schedule WHERE date = '${date}' AND batch_name = '${batch}';`;
  else
    query = `SELECT teacher_name,batch_name,start_time,end_time,task  FROM schedule WHERE date = '${date}' AND teacher_name = '${name}' AND batch_name = '${batch}';`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json({ results });
  });
});

app.post("/deleteEvent", (req, res) => {
  const { teacher_name, start_time, end_time, task } = req.body;

  const query = `DELETE FROM schedule WHERE teacher_name = '${teacher_name}' AND start_time = '${start_time}' AND end_time = '${end_time}' AND task = '${task}';`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
  res.end();
});

app.get("/:date", (req, res) => {
  const dateArray = req.params.date.split("-");
  myDate = req.params.date;
  res.render("day", {
    day: dateArray[0],
    month: monthName[+dateArray[1] - 1],
    year: dateArray[2],
    monthNum: dateArray[1],
  });
});

app.post("/update/:date", (req, res) => {
  const date = req.params.date;
  const { prevData, newData } = req.body;

  const tName = newData.nTname.length ? newData.nTname : prevData.pTname;
  const bName = newData.nBname.length ? newData.nBname : prevData.pBname;
  const ST = newData.nST.length ? newData.nST : prevData.pST;
  const ET = newData.nET.length ? newData.nET : prevData.pET;
  const task = newData.nTask.length ? newData.nTask : prevData.pTask;
  const query = `SELECT id FROM schedule WHERE teacher_name = '${prevData.pTname}' AND batch_name = '${prevData.pBname}' AND start_time = '${prevData.pST}' AND end_time = '${prevData.pET}' AND task = '${prevData.pTask}' AND date = '${date}';`;

  connection.query(query, (err, result) => {
    if (err) throw err;
    const id = result[0].id;
    const qAdd = `select start_time, end_time from schedule where (teacher_name = '${tName}' or batch_name = '${bName}') and date = '${date}' AND id <> ${id};`;
    connection.query(qAdd, (err, result) => {
      if (err) throw err;
      let array = [];
      for (let i = 0; i < result.length; i++) {
        array.push([result[i].start_time, result[i].end_time]);
      }
      for (let i = 0; i < array.length; i++) {
        if (ST >= result[i].start_time) {
          max_start = ST;
        } else {
          max_start = result[i].start_time;
        }
        if (ET <= result[i].end_time) {
          min_end = ET;
        } else {
          min_end = result[i].end_time;
        }
        if (max_start < min_end) {
          count = 0;
          break;
        } else {
          count = 1;
        }
      }
      if (count == 1 || array.length == 0) {
        const q = `UPDATE schedule SET teacher_name = '${tName}', batch_name = '${bName}' , start_time = '${ST}' , end_time = '${ET}' , task = '${task}' WHERE id = '${id}'`;
        connection.query(q, (er, result) => {
          if (err) throw err;
        });
      }
    });
  });
});

app.get("/getWeek/:date", (req, res) => {
  const date = req.params.date;
  const dateArray = date.split("-");
  let [year, month, day] = dateArray;

  const end = new Date(+year, +month, 0).getDate();
  month = +month;
  year = +year;
  day = +day + 6;
  if (day > end) {
    month += 1;
    if (month % 12 == 1) year += 1;
    day -= end;
  }
  const twoDigitMonth = month <= 9 ? `0${month}` : `${month}`;
  const twoDigitDay = day <= 9 ? `0${day}` : `${day}`;
  endDate = `${year}-${twoDigitMonth}-${twoDigitDay}`;

  console.log(date, endDate);

  const query = `SELECT * FROM schedule WHERE date BETWEEN '${date}' AND '${endDate}' ORDER BY date`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json({ results });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
