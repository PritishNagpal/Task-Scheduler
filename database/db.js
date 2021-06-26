const mysql = require("mysql");

const connection = mysql.createPool({
  host: "bbjzu8715dniemmehvw6-mysql.services.clever-cloud.com",
  user: "u1cuj0ibnxb6jp2m",
  password: "fmnyHuPBeTh5RgYq5Et9",
  database: "bbjzu8715dniemmehvw6",
  multipleStatements: true,
});

module.exports = connection;
