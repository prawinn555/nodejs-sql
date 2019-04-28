var express = require('express');
var router = express.Router();
const path = require('path');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/../index.html'));
  //__dirname : It will resolve to your project folder.
});


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);


router.post('/create', product_controller.product_create);

router.get('/:id', product_controller.product_details);

router.put('/:id/update', product_controller.product_update);

router.delete('/:id/delete', product_controller.product_delete);


module.exports = router;