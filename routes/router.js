var express = require('express');
var router = express.Router();
const path = require('path');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');



// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.get('/products', product_controller.product_list);

router.post('/products/create', product_controller.product_create);

router.get('/products/:id', product_controller.product_details);

router.put('/products/:id/update', product_controller.product_update);

router.delete('/products/:id/delete', product_controller.product_delete);


module.exports = router;