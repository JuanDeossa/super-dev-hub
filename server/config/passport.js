import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleAuthService } from "../services/authService.js";
import dotenv from "dotenv";
import { User } from "../models/User.js";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await googleAuthService.findOrCreateUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialización y deserialización
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export { passport };
