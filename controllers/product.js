var db = require('../models/database');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Hello !! from the Test controller!');
};

exports.product_create = function (req, res, next) {
    console.log('Create product %j', req.body);
    console.log('Create product param name=%s price=%s', 
                req.body.name, req.body.price);
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            console.log(err); res.send('Error to access Database :('); return;
        }
        res.send('Product Created successfully')
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) console.log(err); res.send('Error to access Database :('); return;
        res.send(product);
    })
};

exports.product_list = function (req, res, next) {
    Product.find( {}, function (err, products) {
        if (err) console.log(err); res.send('Error to access Database :('); return;
        res.send(products);
    })
};


exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) console.log(err); res.send('Error to access Database :('); return;
        res.send('Product updated');
    });
};

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) console.log(err); res.send('Error to access Database :('); return;
        res.send('Deleted successfully!');
    })
};