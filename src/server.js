const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jsonwebtoken = require("jsonwebtoken");
const helmet =  require("helmet");
const cors = require("cors");

const JWT_SECRET = process.env.jwtSecret;
const port = process.env.port || 8080;

const accesLogStream = fs.createWriteStream(path.join(__dirname,"Access.log"),{flags:'a'})

const todoRoutes = require("./ApiRoutes/todosRoutes");
//const authRoutes = require("./ApiRoutes/authController");
const {Stream}  = require("stream");

var app  = express();

//Cross Origin Resourse Sharing
var whitelist = ['http://localhost:3000', 'http://localhost:8080'];

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
app.use(morgan(':method :url :status :res[content length] - :response-time ms :date[web]',{stream: accesLogStream}));
app.use(helmet());

app.use("/api/v1/todo", todoRoutes );

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
