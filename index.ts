import {Server} from 'uws';

const gameServer =  new Server({port: process.env.PORT || 8000 });

var clients = [];
gameServer.on('connection',(client)=>{
    clients.push(client);
    console.log("new client connected, total clients online",clients.length);
    client.on('message',(data)=>{
        console.log(data);
        let  msg =data;
        clients.forEach((c)=>{
            c.send(msg);
        })
    });
    client.on("close",()=>{
        clients = clients.filter((c)=>{
            return c !== client;
        });
        console.log("client left, total clients online",clients.length);
    })

});