// import User model
const User = require('../models/user-model');
// passport is authentication middleware, don't forget to add passport setting to app.js
const passport = require('passport');

/**
 * - first step to using passport is to configure an authentication strategy
 * - createStrategy (passport-local-mongoose helper method): this quickly setups the LocalStrategy for passport
 * - passport uses what are termed strategies to authenticate requests. Strategies range from verifying a 
 * username and password, delegated authenticatio n using OAuth or federated authentication using OpenID
 */
passport.use(User.createStrategy());

/**
 * - serializeUser and deserializeUser are passport methods 
 * - these ^ methods are required in order to sessions, 
 * passport will serialize and deserialize user instances to and from the session. 
 */
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

// export passport 
module.exports = passport;