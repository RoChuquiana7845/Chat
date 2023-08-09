import Express  from "express";
import morgan from "morgan";
import {Server as SocketServer } from 'socket.io';
import cors from 'cors';
import http from 'http';
import mongoose from "mongoose";
import BodyParser from "body-parser";
import router from "./routes/message.js";
import message from "./models/message.js";

const url = "mongodb://localhost:27017/mensajeria"; 
mongoose.Promise = global.Promise;

//Configuración Mongoose
const app = Express();
const PORT = 4009;

//Creamos el servidor con el módulo http
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
});

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: false})); 
app.use(BodyParser.json()); 
app.use('/api', router);

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('Cliente conectado');

    socket.on('message', (message, nickname)=> { 
        //Envio al resto clients
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })
});


//Conexión a la BDD y escuchamos la aplicación a traves del puerto 4000
mongoose.connect(url, {useNewUrlParser: true}).then(()=>{
    console.log(`Successful connection to the  database`);
    server.listen(PORT, ()=> { 
        console.log(`The server is running in http://localhost:${PORT}`)
    })
})
