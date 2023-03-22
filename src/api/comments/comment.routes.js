const CommentRoutes = require('express').Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { postNewComment, deleteComment } = require('./comment.controller');


CommentRoutes.post('/create', postNewComment);
CommentRoutes.delete('/delete/:id', deleteComment);

module.exports = CommentRoutes;