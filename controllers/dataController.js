var db = require('../models/database');
var SqlString = require('sqlstring');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hello !! from the Test controller!');
};

exports.product_create = function (req, res, next) {
  console.log('Create product %j', req.body);
  console.log('Create product param name=%s data=%s', 
                req.body.name, req.body.data);

  
  var sql    = SqlString.format(`DELETE FROM mydata where name=?;
       INSERT INTO mydata (name, description, data) VALUES (?,?);`,
     [req.body.name, req.body.name, req.body.description, req.body.data]);
  
  db.exec(sql, function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.send(`A row has been inserted with rowid ${this.lastID}`);
    }
  });
};

exports.product_details = function (req, res, next) {
  
   var sql    = SqlString.format('SELECT * from mydata where name=?',
      req.params.name);
 
  db.all(sql,[],(err, rows ) => {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      console.log("result find by %j : %j", req.params, rows);
      res.send(rows)
    }
  });
  
};

exports.product_list = function (req, res, next) {;

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  console.log('find by %j', req.query);

  var searchName = req.query.searchName;                                                
  var str = (searchName===undefined || searchName==='')?  '%' : '%'+searchName +'%';
  console.log('str '+str);
  var sql    = SqlString.format('SELECT * from mydata where name like ?',
      (str) );
                                                  

  db.all(sql,[],(err, rows ) => {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      console.log("result find liste %j", rows);
      res.status(200)
      res.send(rows)
    }

  });
};


exports.product_update = function (req, res, next) {
  var sql    = SqlString.format('UPDATE mydata set name=?, description=?, data=? where name=?',
     [req.body.name, req.body.description, req.body.data, req.body.name]);
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.send('OK');
    }
  });
};

exports.product_delete = function (req, res, next) {
  var sql    = SqlString.format('DELETE FROM mydata where name=?',
     [req.params.name]);
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.send('OK');
    }
  });
};