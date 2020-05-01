var db = require('../models/database');
var SqlString = require('sqlstring');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hello !! from the Test controller!');
};



exports.item_create = async function (req, res, next) {
  
  prepareResponseHeader(res);
  
  console.log('Create item %j', req.body);

  // example to use blocking call (await)
  try {
    var sql;
    var result;

    sql = SqlString.format(`DELETE FROM mydata where id=?`,
      [req.body.id]);
    result = await executeSqlChange(sql);

    sql = SqlString.format(`INSERT INTO mydata (id, type, description, content) VALUES (?,?,?,?)`,
     [req.body.id, req.body.type, req.body.description, req.body.content]);
    await executeSqlChange(sql);

    const replaced = result.changes>0;
    res.send(`A row has been ${replaced? 'replaced' : 'inserted'}`);

  } catch(err) {
      sendError(res, err);
  }
};

function sendError(response, err) {
   console.info(err);
   response.send({ 
      status : 'ERR', 
      message : 'error in database ' +err });
}

function sendOk(response, msg) {
   response.send({ 
      status : 'OK', 
      message : msg });
}

/**  
 * return Promise (number of lines changed) 
 * or throw error
 */
async function executeSqlChange(sql) {

  return await new Promise(function(resolve, reject) {
    // console.log('SQL', sql);
    db.run(sql, function(err) {
      if (err) {
        
        reject(err.message);
      } else {
        console.log(`result of ${sql} => changes ${this.changes}`) ;
        resolve({
          status : 'OK',
          changes : this.changes});
      }
    });
  });
}



exports.item_details = function (req, res, next) {
  
  prepareResponseHeader(res); 
  
  var sql    = SqlString.format('SELECT * from mydata where id=?',
      req.params.id);
 
  db.all(sql,[],(err, rows ) => {
    if (err) {
      
      sendError(res, err);
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
  var criteria = (typeCriteria===undefined || typeCriteria==='')?  '%' : typeCriteria;
  console.log('criteria '+criteria);
  var sql    = SqlString.format('SELECT * from mydata where type like ?',
      (criteria) );
                                                  

  db.all(sql,[],(err, rows ) => {
    if (err) {
      sendError(res, err);
    } else { 
      console.log(`result find liste ${rows.length} \n %j`, rows);
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

exports.item_update = async function (req, res, next) {
  prepareResponseHeader(res);
  
  var sql    = SqlString.format('UPDATE mydata set id=?, description=?, content=? where id=?',
     [req.body.id, req.body.description, req.body.content, req.body.id]);

  try {
    var result = await executeSqlChange(sql);
    sendOk(res, `Number of changes ${result.changes}`);

  } catch(err) {
    sendError(res, err);
  }
};

exports.item_delete = async function (req, res, next) {
  prepareResponseHeader(res);
  
  var sql    = SqlString.format('DELETE FROM mydata where id=?',
     [req.params.id]);

  try {
    var result = await executeSqlChange(sql);
    sendOk(res, `Number of changes ${result.changes}`);

  } catch(err) {
    sendError(res, err);
  }
};