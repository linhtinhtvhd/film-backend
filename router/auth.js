import express from "express";
const AuthRouter = express.Router();
import passport from "passport";
import '../passport/facebook'

const CLIENT_URL = "https://film-linhtinhtvhd.vercel.app";

AuthRouter.get("/login/success", (req, res) => {
  
  if (req.user) {
    res.json({
      success: true,
      message: "successfull",
      user: req.user,
      //  cookies: req.cookies
    });
  }
});

AuthRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

AuthRouter.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
      }
    res.redirect('/');
  });
});

AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

AuthRouter.get(
  "/facebook",
  passport.authenticate("facebook")
);
AuthRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default AuthRouter;
