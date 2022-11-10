const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'.env'})

const CONN_URI = process.env.connection_uri

var connectDb = async() => {

    const conn = await mongoose.connect(CONN_URI,{ useNewUrlParser: true, useUnifiedTopology: true })

    console.log(`Database connected successfully: ${conn.connection.host}`)
}

module.exports = connectDb;