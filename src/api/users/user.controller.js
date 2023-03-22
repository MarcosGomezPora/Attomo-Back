const User = require("./user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt/jwt");

const register = async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      const userDB = await newUser.save();
      return res.status(201).json(userDB);
    } catch (error) {
      return res.status(400).json("fallo al crear un usuario");
    }
};

const getUsers = async (req, res, next) => {
  try {
    const userDB = await User.find();
    return res.status(200).json(userDB);
  } catch (error) {
    return next(setError(404, "user server fail"));
  }
};

const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userDB = await User.findByIdAndRemove(id);
      return res.status(200).json(userDB);
    } catch (error) {
      return res.status(400).json("fallo al eliminar usuario");
    }
};

const login = async (req, res, next) => {
    try {
      const userDB = await User.findOne({ user: req.body.user });
      if (!userDB) {
        return res.status(400).json("ese usuario no existe");
      }
      if (bcrypt.compareSync(req.body.password, userDB.password)) {
  
          const token = generateToken(userDB._id, userDB.user);
          const { name } = userDB
          return res.status(200).json({token, name});
  
      } else {
          return res.status(400).json("esta contraseña está mal");
      }
    } catch (error) {
      return res.status(400).json("fallo al logear usuario");
    }
};

const changePassword = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      console.log(currentPassword, newPassword, id);
      const userDB = await User.findById(id);
      console.log(userDB);
      if (!userDB) {
        return res.status(400).json("ese usuario no existe");
      }
  
      if (!bcrypt.compareSync(currentPassword, userDB.password)) {
        return res.status(400).json("La contraseña actual es incorrecta");
      }
      console.log('hola');
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      userDB.password = hashedNewPassword;
      await userDB.save();
  
      const token = generateToken(userDB._id, userDB.user);
      const { name } = userDB;
      return res.status(200).json({ token, name });
  
    } catch (error) {
      return res.status(400).json("Fallo al cambiar la contraseña");
    }
};

module.exports = {
    register,
    getUsers,
    deleteUser,
    login,
    changePassword
}
