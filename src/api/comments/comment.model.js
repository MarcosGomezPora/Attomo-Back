const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: { type: String, trim: true},
    },
    { timestamps: true }
)

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;