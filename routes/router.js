var express = require('express');
var router = express.Router();
const path = require('path');

var item_controller = require('../controllers/dataController');

/**
 * @swagger
 * definitions:
 *   item:
 *     properties:
 *       id:
 *         type: string
 *       type:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
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
router.get('/test', item_controller.test);

/**
 * @swagger
 * /items:
 *   get:
 *     tags:
 *       - item management
 *     description: Returns all produits
 *     produces:
 *       - application/json
*     parameters:
 *       - name: type
 *         description: object type, ex. MOVIE%
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of items
 */
router.get('/items', item_controller.item_list);

/**
 * @swagger
 * /items/create:
 *   post:
 *     tags:
 *       - item management
 *     description: Create a new item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: item
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/item'
 *     responses:
 *       200:
 *         description: Result 
 */
router.post('/items/create', item_controller.item_create);

/**
 * @swagger
 * /items/{name}:
 *   get:
 *     tags:
 *       - item management
 *     description: Returns a single item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: unique ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single item
 */
router.get('/items/:id', item_controller.item_details);


/**
 * @swagger
 * /items/update:
 *   put:
 *     tags:
 *       - item management
 *     description: Update a item
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: item
 *         description: item object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/item'
 *     responses:
 *       200:
 *         description: result
 */
router.put('/items/update', item_controller.item_update);

/**
 * @swagger
 * /items/{name}/delete:
 *   delete:
 *     tags:
 *       - item management
 *     description: Delete a item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: unique ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: result
 */
router.delete('/items/:id/delete', item_controller.item_delete);


module.exports = router;