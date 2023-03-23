const User = require("../api/users/user.model");
const { verifyJwt } = require("../utils/jwt/jwt");

const isAuth = async (req, res, next) => {
  
  try {
    const token = req.headers.authorization;
        
    if (!token) {
      return res.status(400).json("no estás autorizado");
    }
console.log(token)
    const parsedToken = token.replace("Bearer", "");
console.log(parsedToken)
    const validToken = verifyJwt(parsedToken);
    const userLogued = await User.findById(validToken.id);
    userLogued.password = null;
    req.user = userLogued;
    next();
  } catch (error) {
    console.log("entra en el catch")
    return res.status(400).json(error);
  }
};

const isAdmin = async (req, res, next) => {
  console.log('hola2');
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json("no estás autorizado");
    }

    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogued = await User.findById(validToken.id);

  
    if (userLogued.rol === "admin") {
      userLogued.password = null;
      req.user = userLogued;
      next();
    } else {
      return res.status(400).json("no eres admin maquina date una vuelta");
    }
  } catch (error) {
    return res.status(400).json("no se ha conseguido abrir la puerta");
  }
};

module.exports = { isAuth, isAdmin };
