const Game = require("./game.model");

const postNewGame = async (req, res, next) => {
    try {
        const postNewGame = new Game(req.body);
        const gameDB = await postNewGame.save();
        return res.status(201).json(gameDB);
      } catch (error) {
        return next(error);
      }
};

const getGames = async (req, res, next) => {
    try {
      const gameDB = await Game.find();
      return res.status(200).json(gameDB);
    } catch (error) {
      return next(setError(404, "game server fail"));
    }
};

const putGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const putGame = new Game(req.body);
      putGame._id = id;
      const gameDB = await Game.findById(id);
      const GameUpdate = await Game.findByIdAndUpdate(id, putGame);
      if (!gameDB) {
        return next(setError(404, "Game not found"));
      }
      return res.status(200).json({ new: putGame, old: GameUpdate });
    } catch (error) {
      return next(setError(500, "Game cant be replaced"));
    }
};

const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameDB = await Game.findOneAndDelete({ _id: id });
    if (!gameDB) {
      return next(setError(404, "Error borrando juego"));
    }
    return res.status(200).json(gameDB);
  } catch (error) {
    return next(setError(500, "Juego no se puede borrar"));
  }
};

const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameDB = await Game.findById(id);
    return res.status(200).json(gameDB);
  } catch (error) {
    return res.status(400).json("fallo al obtener juego");
  }
};

module.exports = {
    postNewGame,
    getGames,
    putGame,
    deleteGame,
    getGameById
}