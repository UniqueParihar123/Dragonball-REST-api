const express = require('express');
 const bodyParser = require('body-parser');
//set express app
const mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago',{useMongoClient: true});
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());


app.use(express.static('./public'));//middlewate to acces files like images


//get is to retrieve data
app.get('/api',function(req,res){

	console.log('GET request');
	res.send({name:'Anupam'});
});


//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware

app.use(function(err,req,res,next){

//console.log(err);
res.status(422).send({error:err.message});
});




//listen for requests

app.listen(process.env.port||4000,function(){

console.log('Now listening for requests');

});
