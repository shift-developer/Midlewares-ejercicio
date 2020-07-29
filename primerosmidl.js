const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

const logs = (req, res, next) => {
    const { method, path, query, body } = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next()
}

server.use(logs);

const datos = [];

server.post('/post', (req, res)=> {
    const element = req.body;
    datos.push(element);
    res.json(`Contacto agregado , ${element}`);
});

server.get('/contactos', (req, res) => {
    res.json(datos);
});

server.listen(3000, ()=> {
    console.log('Servidor iniciado');
});