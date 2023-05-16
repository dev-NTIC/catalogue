const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bomareco_catalogue",
    password: "",
});

module.exports = pool.promise();