var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');

});

app.listen(3000, () => {
    console.log('The server started on: 127.0.0.1:3000');
});