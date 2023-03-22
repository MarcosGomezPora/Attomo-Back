const { isAdmin } = require("../../middlewares/auth");
const { 
    register,
    deleteUser, 
    login,
    changePassword, 
    getUsers
} = require("./user.controller");

const UserRoutes = require("express").Router();

UserRoutes.get('/', getUsers)
UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.put("/changePassword/:id", changePassword);
UserRoutes.delete("/delete/:id", deleteUser);


module.exports = UserRoutes;