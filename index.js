const express = require('express');
const cors = require('cors');


const { connectDb } = require('./src/utils/db.js');
const UserRoutes = require("./src/api/users/user.routes");
const GameRoutes = require("./src/api/games/game.routes");
const CommentRoutes = require("./src/api/comments/comment.routes");


const PORT = process.env.PORT || 8080

const app = express();

connectDb();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.use('/users', UserRoutes);
app.use('/games', GameRoutes);
app.use('/comments', CommentRoutes);

app.use('*', (req, res, next) => {
    return next('Route not found')
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'index error')
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})