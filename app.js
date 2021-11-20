// ------------------------------------------------------------------------
// app.js - This is a generic Node application provide by the Express cli,
//          routing to both the default and "content" functional locations.
//          NOTE: This does use EJS-based templating; if you choose to use
//          something else (like Angular or React), you will need to change
//          the view engine.
// ------------------------------------------------------------------------

const express = require("express");
const path = require("path");

// These are the additional packages we need for this application
const maxAPI = require("max-api");
const cors = require("cors");

// set up the express app
const app = express();

// this is the middleware that allows CORS
app.use(cors());

app.use(express.json());

// handle sequencer points
app.post("/sequencer", (req, res) => {
  if (req.body.action === "add") {
    maxAPI.outlet("add", req.body.x, req.body.y, req.body.color);
    res.status(200).send("Added point");
  } else if (req.body.action === "remove") {
    maxAPI.outlet("remove", req.body.x, req.body.y, req.body.color);
    res.status(200).send("Removed point");
  } else {
    res.status(400).send("Invalid action");
  }
});

// serve index for all other paths
app.use(express.static(path.resolve(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

maxAPI.post("Started file handler app");

module.exports = app;
