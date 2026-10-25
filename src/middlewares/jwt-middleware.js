const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../config/serverConfig");
const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(
    opts,
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub).select("-password");
        return done(null, user || false);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const initialize = passport.initialize();
const authenticate = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) return next(error);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        err: {},
        data: {},
      });
    }

    req.user = user;
    return next();
  })(req, res, next);

module.exports = { initialize, authenticate };
