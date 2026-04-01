const express = require("express");
const {createServer} = require("node:http");

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.send('<p>Hello World</p>');
});

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
});