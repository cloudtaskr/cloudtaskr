require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(x => {
  console.log(
    `Connected to Mongo! Database name: "${x.connections[0].name}"`
  );
})
.catch(err => {
  console.error("Error connecting to mongo", err);
});

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    cookie: { 
      maxAge: 1000 * 60 * 60 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// what is this?
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTENDPOINT] 
  })
);

// routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/task-routes'));
app.use('/api', require('./routes/auth-routes'))

require("./config/passport"); 

module.exports = app;