var db = require('../models/database');
var SqlString = require('sqlstring');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hello !! from the Test controller!');
};

exports.item_create = function (req, res, next) {
  
 
  prepareResponseHeader(res);
  
  
  console.log('Create item %j', req.body);
  console.log('Create item param id=%s content=%s', 
                req.body.id, req.body.content);

  
  var sql    = SqlString.format(`DELETE FROM mydata where id=?`,
     [req.body.id]);
  db.run(sql, function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      const replaced = this.changes>0;
      if(replaced) {
        console.log(`Old record deleted : ${this.changes}`);
      }
      doInsert(req, res, replaced);
    }
  });
};

function doInsert(req, res, replaced) {
  var sql = SqlString.format(`INSERT INTO mydata (id, type, description, content) VALUES (?,?,?,?)`,
     [req.body.id, req.body.type, req.body.description, req.body.content]);
  console.log(sql);
  db.run(sql, function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.send(`A row has been ${replaced? 'replaced' : 'inserted'}`);
    }
  });
}

exports.item_details = function (req, res, next) {
  
  prepareResponseHeader(res); 
  
   var sql    = SqlString.format('SELECT * from mydata where id=?',
      req.params.id);
 
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

exports.item_list = function (req, res, next) {;

  prepareResponseHeader(res);
                                                  
  console.log('find by %j', req.query);

  var typeCriteria = req.query.type;                                                
  var criteria = (typeCriteria===undefined || typeCriteria==='')?  '%' : type;
  console.log('criteria '+criteria);
  var sql    = SqlString.format('SELECT * from mydata where type like ?',
      (criteria) );
                                                  

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

function prepareResponseHeader(res) {
  /*
  Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
  Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD
  Access-Control-Allow-Origin: *
  Access-Control-Expose-Headers: date,content-type,content-length,connection,x-powered-by,access-control-allow-origin,access-control-allow-headers,access-control-allow-methods,etag,x-final-url

*/ 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
}

exports.item_update = function (req, res, next) {
  prepareResponseHeader(res);
  
  var sql    = SqlString.format('UPDATE mydata set id=?, description=?, content=? where id=?',
     [req.body.id, req.body.description, req.body.content, req.body.id]);
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.send('OK');
    }
  });
};

exports.item_delete = function (req, res, next) {
  prepareResponseHeader(res);
  
  var sql    = SqlString.format('DELETE FROM mydata where id=?',
     [req.params.id]);
  db.run(sql, [], function(err) {
    if (err) {
      console.log(err);
      res.send('error in database');
    } else { 
      res.send('OK');
    }
  });
};