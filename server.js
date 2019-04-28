
var express = require('express');
var app = express();

var router = require('./routes/router'); 
var bodyParser = require('body-parser');

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'lets try',
  },
  host: 'localhost',
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
// mongodb+srv://test:<password>@cluster0-bs8m2.mongodb.net/test?retryWrites=true
var dev_db_url = 'mongodb+srv://test:test@cluster0-bs8m2.mongodb.net/test?retryWrites=true';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router);
app.use(express.static('static'));

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
