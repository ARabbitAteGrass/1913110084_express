const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const config = require('./config/index');
const passport = require('passport')

mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const companiesRouter = require("./routes/company");
const staffRouter = require("./routes/staff");
const shopRouter = require("./routes/shop");

const errorHandler = require("./middleware/errorHandler") 

const app = express();

app.use(logger("dev"));
app.use(express.json({
  limit:'50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize())

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/company", companiesRouter);
app.use("/staff", staffRouter);
app.use("/shop", shopRouter);

app.use(errorHandler)
module.exports = app;