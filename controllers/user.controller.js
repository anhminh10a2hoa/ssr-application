var User = require('../models/user.model');

module.exports.index = async function(req, res){
    var users = await User.find();
    res.render('users/index', {
        users : users
    });
}

module.exports.search = async function(req, res){
    var q = req.query.q;
    let searchOptions = {}
    if (q != null && q !== '') {
        searchOptions.name = new RegExp(q, 'i')
    }
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', {
            users: users,
            searchOptions: req.query
        })
        console.log(users)
    } catch {
        res.redirect('/')
    }
}

module.exports.create = function(req, res){
    res.render('users/create');
    
}

module.exports.findById = async function(req, res){
    var user = await User.findById(req.params.id).exec();
    res.render('users/view', {
        user : user
    });
}

module.exports.postCreate = async function(req, res){
    req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    
    await new User(req.body).save();
    res.redirect('/users');
}