module.exports.postCreate = function(req, res, next){
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
        return;
    }

    next();
};