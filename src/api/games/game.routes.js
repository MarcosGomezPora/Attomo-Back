const GameRoutes = require('express').Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getGames, getGameById, postNewGame, putGame, deleteGame } = require('./game.controller');



GameRoutes.get('/', getGames);
GameRoutes.get('/id/:id', getGameById),
GameRoutes.post('/create', [isAdmin], postNewGame),
GameRoutes.put('/edit/:id', [isAdmin], putGame),
GameRoutes.delete('/delete/:id', [isAdmin], deleteGame);

module.exports = GameRoutes;