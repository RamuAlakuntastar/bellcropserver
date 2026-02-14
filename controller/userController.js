const UserModel = require("../models/userModel")
const {factoryRegister, loginFactory } = require("../utility/factory")




const userRegister = factoryRegister(UserModel)
const loginUser = loginFactory(UserModel)

module.exports = {userRegister, loginUser}