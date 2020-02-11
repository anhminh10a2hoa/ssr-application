var db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('users/index', {
        users : db.get('users').value()
    });
}

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
}

module.exports.create = function(req, res){
    res.render('users/create');
}

module.exports.findById = function(req, res){
    var id = parseInt(req.params.id);
    
    var user = db.get('users').find({ id : id }).value();
    console.log(user)
    res.render('users/view', {
        user : user
    });
}

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    var errors = [];

    if(!req.body.name){
        errors.push('Fill your name');
    }

    if(!req.body.phone){
        errors.push('Fill your phone number');
    }

    if(errors.length){
        res.render('users/create', {
            errors : errors,
            values : req.body
        });
    }

    db.get('users').push(req.body).write();
    res.redirect('/users');
}