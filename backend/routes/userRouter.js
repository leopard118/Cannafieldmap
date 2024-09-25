// const signInCtrl = require("../controllers/User/signInCtrl");
const signupCtrl = require("../controllers/User/signupCtrl");
const signinCtrl = require("../controllers/User/signinCtrl");

const userRouter = require("express").Router();

userRouter.route("/signup").post(signupCtrl);
userRouter.post("/signin", signinCtrl);

module.exports = userRouter;
