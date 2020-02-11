var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller')
const shortid = require('shortid');
var db = require('../db');
var validate = require('../validate/user.validate');

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.findById);
router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router