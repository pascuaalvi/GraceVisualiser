/* DATABASE */

"use strict";

var app, bodyParser, cookieParser, db, exists, express,
    file, fs, logger, path, routes, server, sqlite3, users;

/* MAIN SETUP */
express = require("express");

app = express();

fs = require("fs");
file = "graceide.db";
exists = fs.existsSync(file);
sqlite3 = require("sqlite3").verbose();

if (exists) {
  console.log("Loading Database from file: %s", file);
  db = new sqlite3.Database(file);
  app.set("db", db);
} else {
  console.log("DB not found!");
}
path = require("path");
//  favicon = require("serve-favicon");
logger = require("morgan");
cookieParser = require("cookie-parser");
bodyParser = require("body-parser");

routes = require("./routes/index");
users = require("./routes/users");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//  uncomment after placing your favicon in /public
//  app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

/*eslint-disable */
app.use(express.static(path.join(__dirname, "public")));
/*eslint-enable */

// Make our db accessible to our routerg my routes
// inside of the server.js file they are separated.
app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use("/", routes);
app.use("/users", users);

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
        "message": err.message,
        "error": err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render("error", {
    "message": err.message,
    "error": {}
  });
});

server = app.listen(3000, function () {
  var host, port;

  host = server.address().address;
  port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

});

module.exports = app;
