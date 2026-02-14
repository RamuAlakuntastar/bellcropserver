const {userRegister,loginUser} = require("../controller/userController")
const express = require("express")
const userRouter = express.Router()




userRouter.post("/register/", userRegister)
userRouter.post("/login/", loginUser)





module.exports = userRouter