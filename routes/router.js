var express = require('express');
var router = express.Router();
const path = require('path');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');


/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       price:
 *         type: integer
 */

/**
 * @swagger
 * /test:
 *   get:
 *     tags:
 *       - Test greetings
 *     description: Test the response of the controller
 *     produces:
 *       - text
 *     responses:
 *       200:
 *         description: Greeting message
 */
router.get('/test', product_controller.test);

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product management
 *     description: Returns all produits
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of products
 *         $ref: '#/definitions/Product'
 */
router.get('/products', product_controller.product_list);

/**
 * @swagger
 * /products/create:
 *   post:
 *     tags:
 *       - Product management
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Result 
 */
router.post('/products/create', product_controller.product_create);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product management
 *     description: Returns a single product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Product id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single product
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get('/products/:id', product_controller.product_details);


/**
 * @swagger
 * /products/{id}/update:
 *   put:
 *     tags:
 *       - Product management
 *     description: Update a product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Product id
 *         in: path
 *         required: true
 *         type: string
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: result
 */
router.put('/products/:id/update', product_controller.product_update);

/**
 * @swagger
 * /products/{id}/delete:
 *   delete:
 *     tags:
 *       - Product management
 *     description: Delete a product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Product id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: result
 */
router.delete('/products/:id/delete', product_controller.product_delete);


module.exports = router;