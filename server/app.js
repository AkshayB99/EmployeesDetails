const express = require("express");
const appError = require("./utils/appError");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("../server/controllers/errorController");
const employeeRouter = require('./routes/employeeRouter');
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

//routes
app.use("/api/v1/Employee", employeeRouter);

app.use("/api/v1/admin", adminRouter);

app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
