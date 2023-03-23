const jwt = require("jsonwebtoken");

const generateToken = (id, user) => {
  return jwt.sign({ id, user }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const verifyJwt = (token) => {
  try{
  return  jwt.verify(token, process.env.JWT_SECRET);
  
  }catch{
    console.log(error)
  }
};

module.exports = { generateToken, verifyJwt };