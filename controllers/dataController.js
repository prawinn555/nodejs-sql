var db = require('../models/database');
var SqlString = require('sqlstring');


exports.test = function (req, res) {
    res.send('Hello !! from the Test controller!');
};


exports.item_save = async function (req, res, next) {
  
  console.log('Create item %j', req.body);
  
  // example to use blocking call (await)
  try {
    var sql;
    var result;

    if(!req.body.id) {
      throw new Error("ID is required");
    }
    sql = SqlString.format(`DELETE FROM mydata where id=?`,
      [req.body.id]);
    result = await executeSqlChange(sql);

    sql = SqlString.format(`INSERT INTO mydata (id, type, description, content) VALUES (?,?,?,?)`,
     [req.body.id, req.body.type, req.body.description, req.body.content]);
    await executeSqlChange(sql);

    const replaced = result.changes>0;
    sendOk(res, `A row has been ${replaced? 'updated' : 'inserted'}`);

  } catch(err) {
      sendError(res, 'DB error : ' + err);
  }
};

function sendError(response, err) {
   console.info(err);
   response.send({ 
      status : 'ERR', 
      message : '' +err });
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
  
  
  var sql    = SqlString.format('SELECT * from mydata where id=?',
      req.params.id);
 
  db.all(sql,[],(err, rows ) => {
    if (err) {
      
      sendError(res, 'DB error : ' + err);
    } else { 
      console.log("result find by %j : %j", req.params, rows);
      
      res.send(rows)
    }
  });
  
};

exports.item_list = function (req, res, next) {;

                                                  
  console.log('find by %j', req.query);

  var typeCriteria = req.query.type;                                                
  var criteria = (typeCriteria===undefined || typeCriteria==='')?  '%' : typeCriteria;
  console.log('criteria '+criteria);
  var sql    = SqlString.format('SELECT id, type, description from mydata where type like ?',
      (criteria) );
                                                  

  db.all(sql,[],(err, rows ) => {
    if (err) {
      sendError(res, 'DB error : ' + err);
    } else { 
      console.log(`result find liste ${rows.length} \n %j`, rows);
      
      res.status(200)
      res.send(rows)
    }

  });
};



exports.item_delete = async function (req, res, next) {
  
  console.log('delete', req.query);

  var sql    = SqlString.format('DELETE FROM mydata where id=?',
     [req.params.id]);

  try {
    var result = await executeSqlChange(sql);
    sendOk(res, `Number of changes ${result.changes}`);

  } catch(err) {
    sendError(res, 'DB error : ' + err);
  }
};