const GameRoutes = require('express').Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getGames, getGameById, postNewGame, putGame, deleteGame } = require('./game.controller');



GameRoutes.get('/', getGames);
GameRoutes.get('/id/:id', getGameById),
GameRoutes.post('/create', postNewGame),
GameRoutes.put('/edit/:id', putGame),
GameRoutes.delete('/delete/:id', deleteGame);

module.exports = GameRoutes;