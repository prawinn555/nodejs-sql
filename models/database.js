// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';


var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile); 


// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE mydata (name TEXT, description TEXT, data TEXT)');
    console.log('New table created!');
    
    var sql    = `INSERT INTO mydata (name, description) VALUES ("Mike\'s Birthday", "11 Jan 2019"), 
          ("Sophie\'s Birthday", "14 Mar 2019"),
          ("Joe\'s Birthday", "15 Mar 2019")`;
    db.serialize(function() {
      db.run(sql);
    });
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