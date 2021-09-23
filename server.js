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
io.on('connection', socket => {
    console.log("Client is connected: ", socket.id)
    socket.on('mouseMoving', (y, x) => {
        io.to('ground').emit('mouseMoved', socket.id, y, x);
    })
    socket.on('join', () => {
        io.to('ground').emit('createCursor', socket.id);
    })
    socket.join("ground");
    socket.on("disconnect", () => {
        io.to('ground').emit('disconnected', socket.id);
    });
});



server.listen(3000, () => {
    console.log('The server started on: 127.0.0.1:3000');
});