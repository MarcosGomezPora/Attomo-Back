const { isAdmin } = require("../../middlewares/auth");
const { 
    register,
    deleteUser, 
    login,
    changePassword 
} = require("./user.controller");

const UserRoutes = require("express").Router();


UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.put("/changePassword/:id", changePassword);
UserRoutes.delete("/delete/:id", deleteUser);


module.exports = UserRoutes;