//C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//v0.1 avec npm i nodemmon
const http=require('http');

//v0.2
require("dotenv").config();

//v0.3
const {connectToMongoDB}=require("./db/db")


// njibou  les routes mta3na

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var osRouter = require("./routes/osRouter");
var authRouter = require("./routes/authRouter");
var platRoutes = require("./routes/platRoutes");
var menuRouter = require("./routes/menuRouter");


var orderRoutes = require("./routes/orderRouter");
var commentaireRoutes = require("./routes/commentaireRouter");

var app = express();


//nesta3mlou les routes hathom eli lazmin par defaut

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//nesta3mlou tawa les routes eli jebnahom [eli ani sna3thom]

app.use('/auth',authRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/plats", platRoutes);
app.use("/menu", menuRouter);


app.use("/orders", orderRoutes);
app.use("/commentaires", commentaireRoutes);




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
server.listen(process.env.PORT,()=>{connectToMongoDB(),console.log("app is running on port 5000")}); //v0.1+(v0.2:process.env.port)

