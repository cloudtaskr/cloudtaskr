// needed to use environment variables from .env file
require("dotenv").config();

// default code made by irongenerate, imports necessary middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// cors import, used to allow the front-end to connect to the back-end
const cors = require("cors");
// session import, used for session login
const session = require("express-session");
// passport import, used for login authentication
const passport = require("passport");

// default code made by irongenerate, creates mongoose settings
mongoose
  /**
   * - process.env.MONGODB_URI refers to a variable named MONGODB_URI in the .env file
   * - process.env.MONGODB_URI was originally "mongodb://localhost/db-name", it was chagned to accomodate the 
   * server running on the cloud
   */
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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

// default code made by irongenerate, starts a server
const app = express();

// default code made by irongenerate, Middleware Setup, app.use loads functions as middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize session, this needs to be declared before passport.session()
app.use(
  session({
    // secret is the only required field for session
    secret: process.env.SECRET,
    // cookie is an optional field, there are a lot of optional fields check documenation for more
    cookie: { 
      // specifies the number (in milliseconds) to use when calculating when the cookie will expire
      maxAge: 1000 * 60 * 60 
    },
  })
);

// initialize passport
app.use(passport.initialize());
// needed to use persistent login sessions
app.use(passport.session());

// // default code made by irongenerate, Express View engine setup
// // this is not needed since we will render react components not hbs views
// app.use(
//   require("node-sass-middleware")({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//     sourceMap: true
//   })
// );

// // default code made by irongenerate, this setups the hbs view settings
// // this is not needed since we will render react components not hbs views
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
// app.use(express.static(path.join(__dirname, "public"))); ---------------------> this is necessary
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default code made by irongenerate
// what does it do???
app.use(express.static(path.join(__dirname, "public")));

// // // default code made by irongenerate, creates a global variable named title
// // this is not needed since we will render react components not hbs views
// app.locals.title = "insertNameHere";

// initialize cors 
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTENDPOINT] // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/task'));
app.use('/api', require('./routes/auth-routes'))

// pass passport for configuration
require("./config/passport"); 

module.exports = app;
