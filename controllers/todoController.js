var bodyParser = require('body-parser');
var mongoose = require('mongoose')


//Connect to db

mongoose.connect('mongodb://localhost/todo');

//Create a schema

var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo',todoSchema);

// var itemOne = Todo({item:'Get flowers'}).save(function(err){
// 	if(err) throw err;
// 	console.log('Item saved');

// });

var data = [{item:"Get milk"},{item:"Walk dog"},{item:"Do some coding"}];
var urlencodedParser = bodyParser.urlencoded({extended:false});
module.exports = function(app){

app.get('/todo',function(req,res){
	Todo.find({},function(err,data){
		if(err) throw err;
		res.render('todo',{todos:data});
	});
});

app.post('/todo',urlencodedParser,function(req,res){
	var NewTodo = Todo(req.body).save(function(err,data){
		if (err) throw err;
		res.json(data);
	})
});


app.delete('/todo/:item',function(req,res){
	Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
		if(err) throw err;
		res.json(data);

	});
});
}

