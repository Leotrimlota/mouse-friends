const express = require('express');
var exphbs = require('express-handlebars');
const app = express();
app.use(express.static('./public'))

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"]
      }
});
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('home');

});
io.on('connection', client => { 
    console.log("Client is connected: ", client.id)
 });

server.listen(3000, () => {
    console.log('The server started on: 127.0.0.1:3000');
});