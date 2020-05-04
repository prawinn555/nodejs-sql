var db = require('../models/database');


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
      sendError(res, 'ID is required');
      return;
    }
    sql = `DELETE FROM mydata where id=?`;
    result = await executeSqlChange(sql, [req.body.id]);

    var content = req.body.content;
    sql = `INSERT INTO mydata (id, type, description, content) VALUES (?,?,?,?)`;
    await executeSqlChange(sql, [req.body.id, req.body.type, req.body.description, content]);

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
async function executeSqlChange(sql, params) {

  return await new Promise(function(resolve, reject) {
    // console.log('SQL', sql);
    db.run(sql, params? params : [], function(err) {
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
  
  
  var sql  = 'SELECT * from mydata where id=?';
 
  db.all(sql,[req.params.id],(err, rows ) => {
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

  let typeCriteria = req.query.type;                                                
  let criteria = (typeCriteria===undefined || typeCriteria==='')?  '%' : typeCriteria;
  console.log('criteria '+criteria);
  let sql    = ('true'===req.query.opposite)?
       'SELECT id, type, description from mydata where type not like ?' :
       'SELECT id, type, description from mydata where type like ?';
                                                  

  db.all(sql,[criteria],(err, rows ) => {
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

  var sql    = 'DELETE FROM mydata where id=?';

  try {
    var result = await executeSqlChange(sql, [req.params.id]);
    sendOk(res, `Number of changes ${result.changes}`);

  } catch(err) {
    sendError(res, 'DB error : ' + err);
  }
};