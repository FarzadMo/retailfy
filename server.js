//require("dotenv").config();

const express = require("express");
const routes = require("./routes");
let fs = require("fs");
const db = require("./models");
let session = require("express-session");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 3044;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
    secret: "retailfy",
    resave: true,
    saveUninitialized: true
  })
);

app.use(fileUpload());

// Routes
app.use(routes);

function runServer() {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
}

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  if (syncOptions.force) {
    //execute the schema changes and the seeds
    let schema = fs.readFileSync("./scripts/schema.sql", { encoding: "utf8" });
    let seeds = fs.readFileSync("./scripts/seedDB.sql", { encoding: "utf8" });

    db.sequelize.query(schema + seeds, { raw: true }).then(() => {
      runServer();
    });
  } else {
    runServer();
  }
});

module.exports = app;
