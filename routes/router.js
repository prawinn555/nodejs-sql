var express = require('express');
var router = express.Router();
const path = require('path');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');



/**
 * @swagger
 * /test:
 *   get:
 *     tags:
 *       - Test
 *     description: Tester si la réponse du controlleur
 *     produces:
 *       - text
 *     responses:
 *       200:
 *         description: Greetings du controlleur
 */
router.get('/test', product_controller.test);

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Produits
 *     description: Returns all produits
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.get('/products', product_controller.product_list);

router.post('/products/create', product_controller.product_create);

router.get('/products/:id', product_controller.product_details);

router.put('/products/:id/update', product_controller.product_update);

router.delete('/products/:id/delete', product_controller.product_delete);


module.exports = router;