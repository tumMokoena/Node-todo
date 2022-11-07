const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const port = process.env.port || 3000;

var app  = express();

//Application Middlewares
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content length] - :response-time ms :date[web]'));
app.use("/api/todos", require("./ApiControllers/todosController"));

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
