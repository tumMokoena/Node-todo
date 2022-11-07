const express = require("express");
var bodyParser = require("body-parser");
const port = process.env.port || 3000;

var app  = express();

app.use(bodyParser.json());

app.use("/api/todos", require("./ApiControllers/todosController"));

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});