
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

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';


var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE data (name TEXT, time TEXT)');
    console.log('New table Dreams created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")');
    });
  }
  else {
    console.log('Database "Dreams" ready to go!');
    db.each('SELECT * from Dreams', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});


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
