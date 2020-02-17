var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart: String, 
});

var Session = mongoose.model('Session', sessionSchema, 'sessions'); //name of module, schema, collection's name

module.exports = Session;