var db = require('../models/database');
var SqlString = require('sqlstring');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hello !! from the Test controller!');
};

exports.product_create = function (req, res, next) {
  console.log('Create product %j', req.body);
  console.log('Create product param name=%s price=%s', 
                req.body.name, req.body.price);

  var sql    = SqlString.format('INSERT INTO mydata VALUES (?,?)',
     [req.body.name, req.body.price]);
  
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.sen('A row has been inserted with rowid ${this.lastID}');
    }
  });
};

exports.product_details = function (req, res, next) {
  
   var sql    = SqlString.format('SELECT * from mydata where name=?',
      req.params.id);
 
  db.all(sql,[],(err, rows ) => {
      res.send(rows)
  });
  
};

exports.product_list = function (req, res, next) {;
  console.log('find all');
  var sql    = SqlString.format('SELECT * from mydata',
      req.params.id);
  db.all(sql,[],(err, rows ) => {
      res.send(rows)
  });
};


exports.product_update = function (req, res, next) {
  var sql    = SqlString.format('UPDATE mydata VALUES set name=?, time=? where name=?',
     [req.body.name, req.body.price,req.params.id]);
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.sen('OK');
    }
  });
};

exports.product_delete = function (req, res, next) {
  var sql    = SqlString.format('DELETE FROM mydata where name=?',
     [req.body.name, req.body.price,req.params.id]);
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.sen('OK');
    }
  });;
};