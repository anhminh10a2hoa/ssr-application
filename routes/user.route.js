var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller')
const shortid = require('shortid');
var db = require('../db');

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.findById);
router.post('/create', controller.postCreate);

module.exports = router