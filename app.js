//C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

//v0.3
const {connectToMongoDB}=require("./db/db")

//v0.1 avec npm i nodemmon
const http=require('http');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var osRouter = require("./router/osRouter");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use('/os',osRouter);
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

//v0.1:sna3na serveurna
//RQ:5000 twali lien mba3ed

//port t5arej response(:request out) w te9bel requette(:in)
const server=http.createServer(app);
server.listen(process.env.PORT ,()=>{connectToMongoDB(),console.log("app is running on port 5000")}); //v0.1+(v0.2:process.env.port)
