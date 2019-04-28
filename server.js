
var express = require('express');
var app = express();
require('dotenv').config()

var router = require('./routes/router'); 
var bodyParser = require('body-parser');

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Let s try',
  },
  basePath: '/',
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc({
 // import swaggerDefinitions
 swaggerDefinition: swaggerDefinition,
 // path to the API docs
 apis: ['./routes/*.js'],
});

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Set up mongoose connection
var mongoose = require('mongoose');
// avoir deprecated method
mongoose.set('useFindAndModify', false);

// database URL
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// the body of the request POST/PUT will be parsed as json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// map paths to different functions
app.use('/', router);

// search static files in 'static' directories
app.use(express.static('static'));

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
