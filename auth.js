import express from "express";
const AuthRouter = express.Router();
import passport from "passport";
import './facebook'
const CLIENT_URL = "http://localhost:3000/";

AuthRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

AuthRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

AuthRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
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
