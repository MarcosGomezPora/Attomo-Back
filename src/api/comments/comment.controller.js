const Comment = require("./comment.model");

const postNewComment = async (req ,res, next) => {
    try {
        const postNewComment = new Comment(req.body);
        const commentDB = await postNewComment.save();
        return res.status(201).json(commentDB);
      } catch (error) {
        return next(error);
      }
};

const deleteComment = async (req, res, next) => {
    try {
      const { id } = req.params;
      const commentDB = await Comment.findOneAndDelete({ _id: id });
      if (!commentDB) {
        return next(setError(404, "Error borrando comentario"));
      }
      return res.status(200).json(commentDB);
    } catch (error) {
      return next(setError(500, "Comentario no se puede borrar"));
    }
  };

  module.exports = {
    postNewComment,
    deleteComment
  }