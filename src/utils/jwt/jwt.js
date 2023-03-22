const jwt = require("jsonwebtoken");

const generateToken = (id, user) => {
  return jwt.sign({ id, user }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const verifyJwt = (token) => {
  try{
  console.log('entra en verificarToken ' + token + "   " + process.env.JWT_SECRET) 
  let a = jwt.verify(token, process.env.JWT_SECRET);
  console.log('pasa a')
  console.log(a)
  return a
  }catch{
    console.log('el error es este')
  }
};

module.exports = { generateToken, verifyJwt };