var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

var auth = require("./auth/auth");
var base_url = "/api/v1";
var signup = require("./routes/authenticate/signup");
var login = require("./routes/authenticate/login");
var create_group = require("./routes/group/create_group");
var get_groups = require("./routes/group/get_groups");
var get_my_group = require("./routes/group/get_my_group");
var create_join_request = require("./routes/join_request/create_join_request");
var get_my_join_requests = require("./routes/join_request/get_my_join_requests");
var get_my_group_join_request = require("./routes/join_request/get_my_group_join_request");
var accept_join_request = require("./routes/join_request/accept_join_request");
var create_connection_request = require("./routes/connection_request/create_connection_request");
var get_my_group_connection_request = require("./routes/connection_request/get_my_group_connection_request");
var accept_connection_request = require("./routes/connection_request/accept_connection_request");
var send_message = require("./routes/chat/send_message");
var get_messages = require("./routes/chat/get_messages");
var get_chats = require("./routes/chat/get_chats");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.post(`${base_url}/auth/signup`, function (req, res) {
  signup(req, res);
});

app.post(`${base_url}/auth/login`, function (req, res) {
  login(req, res);
});

app.post(`${base_url}/groups`, auth, function (req, res) {
  create_group(req, res);
});

app.get(`${base_url}/groups`, auth, function (req, res) {
  get_groups(req, res);
});

app.get(`${base_url}/groups/my`, auth, function (req, res) {
  get_my_group(req, res);
});

app.post(`${base_url}/join_requests`, auth, function (req, res) {
  create_join_request(req, res);
});

app.get(`${base_url}/join_requests`, auth, function (req, res) {
  get_my_join_requests(req, res);
});

app.get(`${base_url}/join_requests/group`, auth, function (req, res) {
  get_my_group_join_request(req, res);
});

app.post(`${base_url}/join_requests/accept`, auth, function (req, res) {
  accept_join_request(req, res);
});

app.post(`${base_url}/connection_requests`, auth, function (req, res) {
  create_connection_request(req, res);
});

app.get(`${base_url}/connection_requests`, auth, function (req, res) {
  get_my_group_connection_request(req, res);
});

app.post(`${base_url}/connection_requests/accept`, auth, function (req, res) {
  accept_connection_request(req, res);
});

app.post(`${base_url}/chats/:user_id`, auth, function (req, res) {
  send_message(req, res);
});

app.get(`${base_url}/chats/:user_id`, auth, function (req, res) {
  get_messages(req, res);
});

app.get(`${base_url}/chats`, auth, function (req, res) {
  get_chats(req, res);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
