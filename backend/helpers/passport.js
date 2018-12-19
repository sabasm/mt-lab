const passport = require('passport')
const User = require('../models/users/User')

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport