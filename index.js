require('dotenv').config()

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
var csrf = require('csurf')
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute = require('./routes/product.route')
var cartRoute = require('./routes/cart.route')
var transferRoute = require('./routes/transfer.route')

var authMiddlewares = require('./middlewares/auth.middlewares');
var sessionMiddlewares = require('./middlewares/session.middlewares');

const port = 3001;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddlewares);

app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('index');
});

//user routes
app.use('/users',authMiddlewares.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products',productRoute);
app.use('/cart',cartRoute);
app.use('/transfer', authMiddlewares.requireAuth, transferRoute);

app.listen(port, function(){
    console.log("Listening to port " + port);
});
app.use(csrf({ cookie: true }))
