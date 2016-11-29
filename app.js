var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var connection = require('./connection');
var routes = require('./routes');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res){
	res.sendFile('home.html', {'root':__dirname + '/templates'});
});

app.get('/wedding', function(req, res){
	res.sendFile('index.html', {'root':__dirname + '/templates'});
});

app.get('/showSignInPage', function(req, res){
	res.sendFile('signin.html', {'root':__dirname + '/templates'});
});

app.get('/showSignUpPage', function(req, res){
	res.sendFile('signup.html', {'root':__dirname + '/templates'});
});

connection.init();
routes.configure(app);

app.listen(3000, function(){
	console.log('Node Server Running at http://localhost:3000');
});