const express = require('express');
const app = express();
const db = require('./db');
var user = require('./routes/user.route')
const port = 3001;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    res.render('index');
});

//user routes
app.use('/users', user);

app.listen(port, function(){
    console.log("Listening to port " + port);
});
