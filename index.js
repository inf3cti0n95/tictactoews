"use strict";
exports.__esModule = true;
var uws_1 = require("uws");
var gameServer = new uws_1.Server({ port: 8000 });
var clients = [];
gameServer.on('connection', function (client) {
    clients.push(client);
    console.log("new client connected, total clients online", clients.length);
    client.on('message', function (data) {
        console.log(data);
        var msg = data;
        clients.forEach(function (c) {
            c.send(msg);
        });
    });
    client.on("close", function () {
        clients = clients.filter(function (c) {
            return c !== client;
        });
        console.log("client left, total clients online", clients.length);
    });
});
