// Set up MySQL connection.
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "kf3k4aywsrp0d2is.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "psv3ymt94q1vlrr8",
    password: "szz1fivjdy5lbwry",
    database: "fbn6nxgvsssqa3o6"
  });
}

connection.connect();
module.exports = connection;
