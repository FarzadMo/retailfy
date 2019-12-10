// Set up MySQL connection.
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "ff0u7ix7efl2r64x",
    password: "g1h7xpqiq2cpo08g",
    database: "l9yqhaod4ytb4rfg"
  });
}

connection.connect();
module.exports = connection;
