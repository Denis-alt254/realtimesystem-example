const express = require("express");
const {createServer} = require("node:http");
const {join} = require("node:path");
const {Server, Socket} = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});

io.on('connection', (socket) => {
    socket.onAny((eventName, ...args) => {
        console.log(eventName);
        console.log(args);
    });
});

io.on('connection', (socket) => {
    socket.join('some room');
    io.to('some room').emit('hello', 'world');
    io.except('some room').emit('hello', 'world');
    socket.leave('some room');
})

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
});