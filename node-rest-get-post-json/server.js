//import the express module
var express = require('express');

//import body-parser
var bodyParser = require('body-parser');

//store the express in a variable
var app = express();

//configure body-parser for express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//allow express to access our html (index.html) file
app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

//route the GET request to the specified path, "/user".
//This sends the user information to the path
app.post('/user/add', function (req, res) {
  response = {
    content: req.body.content,
  };

  //this line is optional and will print the response on the command prompt
  //It's useful so that we know what infomration is being transferred
  //using the server
  console.log(response);

  //convert the response in JSON format
  res.end(response.content);
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

//This piece of code creates the server
//and listens to the request at port 8888
//we are also generating a message once the
//server is created
var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});