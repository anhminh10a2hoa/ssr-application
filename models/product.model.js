var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String, 
    image: String, 
    description: String
});

var Product = mongoose.model('Product', productSchema, 'products'); //name of module, schema, collection's name

module.exports = Product;