var db = require('../db');

module.exports.requireAuth = function(req, res, next){
    var user = db.get('users').find({ id: req.cookies.userId }).value();

    if(!req.cookies.userId || !user){
        res.redirect('/auth/login');
        return;
    }

    next();
};