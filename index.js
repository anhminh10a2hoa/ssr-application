const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')

var authMiddlewares = require('./middlewares/auth.middlewares');

const port = 3001;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('index');
});

//user routes
app.use('/users',authMiddlewares.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function(){
    console.log("Listening to port " + port);
});
