const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.jwtSecret;
const port = process.env.port || 3000;

const accesLogStream = fs.createWriteStream(path.join(__dirname,"Access.log"),{flags:'a'})

const todoRoutes = require("./ApiControllers/todosController");
const authRoutes = require("./ApiControllers/authController");
const { Stream } = require("stream");



var app  = express();

//Application Middlewares
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content length] - :response-time ms :date[web]',{stream: accesLogStream}));
app.use("/api/todos", todoRoutes );
app.use("/api/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
