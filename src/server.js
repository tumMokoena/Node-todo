const fs = require("fs")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const jsonwebtoken = require("jsonwebtoken")
const helmet =  require("helmet")
const cors = require("cors")
const connectDb = require('../dbConnection')
const dotenv = require('dotenv')
const auth = require("./Middlewares/auth")

dotenv.config({path:'.env'})

const JWT_SECRET = process.env.jwtSecret;
const port = process.env.port || 3000;

//connect to database
connectDb()
const accesLogStream = fs.createWriteStream(path.join(__dirname,"Access.log"),{flags:'a'})

const todoRoutes = require("./ApiRoutes/todosRoutes")
const userRoutes = require('./ApiRoutes/userRoutes')
const {Stream}  = require("stream")

var app  = express();

//Cross Origin Resourse Sharing
var whitelist = ['http://localhost:3000', 'http://localhost:8080']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//Application Middlewares
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content length] - :response-time ms :date[web]', { stream : accesLogStream }));
app.use(helmet());


app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/todo", auth , todoRoutes )


const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

//handle promise rejection when trying to connect to database
process.on('unhandledRejection',( err , promise ) => {
  console.log(`err: ${err.message}`)
  server.close(()=>process.exit(-1))
})