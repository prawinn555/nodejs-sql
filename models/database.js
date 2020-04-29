// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';


var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile); 


// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE mydata (id TEXT, type TEXT, description TEXT, content TEXT)');
    console.log('New table created!');
    
    var sql    = `INSERT INTO mydata (id, type, description) VALUES 
          ("1", "test", "test"), 
          ("2", "test", "test"),
          ("3", "test", "test")
          `;
    db.serialize(function() {
      db.run(sql);
    });
  }
  else {
    console.log('Database ready to go!');
    console.log('Its content is the following : ');
    db.each('SELECT * from mydata', function(err, row) {
      if ( row ) {
        console.log('record:', row); 
      }
    });
  }
});

// Export the model
module.exports = db;