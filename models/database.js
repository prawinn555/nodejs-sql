// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';


var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);


// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE mydata (name TEXT, time TEXT)');
    console.log('New table created!');
    
  }
  else {
    console.log('Database ready to go!');
    db.each('SELECT * from mydata', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// Export the model
module.exports = db;