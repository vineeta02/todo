var express = require('express')
var todoController = require('./controllers/todoController');

var app = express()

//setting up template engine
app.set('view engine','ejs');

//static files

app.use(express.static('./public'))

//listent to port

todoController(app);
app.listen(4000);
console.log("Listening at port 4000");
