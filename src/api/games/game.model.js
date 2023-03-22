const { default: mongoose } = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        image: { type: String, trim: true},
        name: { type: String, trim: true},
        vote: { type: String, trim: true},
        category: [
            {
               categories: { type: String, trim: true}
            },
        ],
        /* comments: [
            {
                comment: { type: mongoose.Types.ObjectId,
                ref: "comments"}
            }
        ] */
    },
    { timestamps: true }
)

const Game = mongoose.model("games", gameSchema);
module.exports = Game;