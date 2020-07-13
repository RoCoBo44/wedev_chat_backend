import passport from 'passport'
import models from './models'
require('dotenv').config() 

var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET
passport.use(new JwtStrategy(opts, async function (jwtPayload, done) {
  return done(null, await models.user.findOne({ where: { id: jwtPayload.sub } }))
}))

export default  function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) { return next(err) }
      req.user = user
      next()
    })(req, res, next) 
}
