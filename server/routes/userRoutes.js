const userRouter = require("express").Router();
// const User = require("../models/userModel");
const {registerUser, loginUser, currentUser, forgetPassword, resetPassword} = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");
//register a user
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", authMiddleware, currentUser);
userRouter.patch("/forgetpassword", forgetPassword);
userRouter.patch("/resetpassword", resetPassword);
module.exports = userRouter;