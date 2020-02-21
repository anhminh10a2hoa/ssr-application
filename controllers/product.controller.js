var Product = require('../models/product.model');

module.exports.index = async function(req, res){
    var page = parseInt(req.query.page) || 1;
    var perpage = 8;

    var drop = (page - 1) * perpage;

    // res.render('products/index', {
    //     products : db.get('products').drop(drop).take(perpage).value()
    // });
    var products = await Product.find().skip(drop).limit(perpage).sort();
        res.render('products/index', {
            products : products
        });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedProducts = db.get('products').value().filter(function(product){
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('products/index', {
        products: matchedProducts
    });
}

module.exports.create = function(req, res){
    res.render('products/create');
}

module.exports.findById = async function(req, res){
    var product = await Product.findById(req.params.id).exec();
    res.render('products/view', {
        product : product
    });
}

module.exports.postCreate = async function(req, res){
    await new Product(req.body).save();   
    res.redirect('/products');
}