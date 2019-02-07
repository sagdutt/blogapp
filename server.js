var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/node_modules', express.static(__dirname + "/node_modules")); 
app.use(bodyParser.json());

//authentication
app.use(function(req, res, next) {
    var user = req.header('user');
    var password = req.header('password');

    if (user === undefined || password === undefined || user !== 't3stBl0gU53r' || password !== '0p3N53sAMe') {
        res.statusCode = 401;
        res.json( {status :'Unauthorized'} );
    } else {
        next();
    }
});

// Store all posts in memory
var posts = [];

app.get('/posts', function(req, res){
	res.json(posts);
});

app.post('/post', function(req, res){
	var post = {};
	if( req.body !== undefined && 'title' in req.body && 'author' in req.body && 'body' in req.body){
		post.createdAt = new Date();
		post.author = req.body.author;
		post.title = req.body.title;
		post.body = req.body.body;
		posts.push(post);
		res.json( { status: "OK"} );
	}else{
		res.statusCode = 400;
		res.json( {status: "Bad Request"} );
	}
});


app.listen('80', function(){
	console.log("Listening on port 80");
});