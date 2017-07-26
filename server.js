const express = require('express')  
const app = express()  
const port = 3000
var bodyParser = require('body-parser')
// var fs = require('fs');
var mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, function(err) {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Magic is happening on ${process.env.PORT}`)
});

// app.listen(port, function(err) {  
//  if (err) {
//    return console.log('something bad happened', err)
//  }
//  console.log(`Magic is happening on ${port}`)
// });


//Connect to Mongo
mongoose.connect('mongodb://heroku_qgcjr9k0:dk9hse1csiu0l52rljicap4vsc@ds153392.mlab.com:53392/heroku_qgcjr9k0', function(error){
	if (error) console.error(error);
	else console.log('mongo connected');

});

//MongoDB schema
Schema = new mongoose.Schema({
	description: String,
	status: String,
	name: String
    },{ collection: 'todo' });

var Todo = mongoose.model('todo', Schema);


app.get('/todo-app', function(request, response) {  
  response.send('Hello from Express!');
  console.log('route succesfully getting hit');


Todo.find({}, function(err,todo){
	console.log('were here');
	if(err){
		console.log('ERROR:',err)
	}else{
		console.log('SUCCESS:',todo);
	}
})
});


//GET Todos from MongoDB 



app.get('/get-allTodos', function(request, response){
console.log('this route is being hit')

    Todo.find({}, function(err, todo){
        console.log('we are here');
        if(err){
            console.log('ERROR:',err)
        }else{
            response.send(todo);
        }
    });

});


//POST newTodos to MongoDB
app.post('/post-newTodos', function(request, response){
	// console.log(request.body);
	var todo = new Todo(request.body);
		console.log("here!",todo);
	
	todo.save(function (err,todo){
		if(err){
			console.log(err);
		}else{
			// console.log(todo);
			// response.send(todo);
			response.json(todo);
		}
	});
});	


 //EDIT EXISTING POST
 app.post('/post-editTodos',function(req, res){
 	
 	// console.log(req.body); 
 	Todo.findOne(req.body,function(err,todo){
 		if (err){
 			console.log('ERROR', err)
 		}
 	
 	todo.status="Complete"
 	todo.save(function(err,response){
 		if (err){
 			console.log('ERROR', err);
 		}else{
 			console.log('SUCCESS', todo);
 			//response.json({"success":true});
 				//response.send('Edit is working');
 				res.send(todo);
 		}
 		
 		})
 	});
 });


 //define folder that will be used for static assets 
app.use(express.static('public'));

