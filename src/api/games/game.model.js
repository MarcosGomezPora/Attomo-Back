const { default: mongoose } = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        image: { type: String, trim: true},
        name: { type: String, trim: true},
        category: [
            { type: String, trim: true, },
        ],
        votes: { type: Number, default: 0 },
    },
    { timestamps: true }
)

const Game = mongoose.model("games", gameSchema);
module.exports = Game;