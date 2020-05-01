
const express = require('express');
const app = express(); 

const router = require('./routes/router'); 
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  info: {
    title: 'Simple CRUD Service',
    version: '1.0.0',
    description: 'Let s try',
  },
  basePath: '/', 
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
 // import swaggerDefinitions
 swaggerDefinition: swaggerDefinition,
 // path to the API docs
 apis: ['./routes/*.js'],
});

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD");
  next();
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
