import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
});

export default conn.promise();
