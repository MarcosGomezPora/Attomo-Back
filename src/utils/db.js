const mongoose = require('mongoose');

const urlDb = process.env.DB_URL

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', true);
        const db = await mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })
        const { name, host } = db.connection
        console.log(`Connected with db name: ${name} in host: ${host}`)
    } catch (error) {
        console.error('Error to connect with db', error);
    }
}

module.exports = { connectDb }