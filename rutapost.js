const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

let datos = [];

const validarRequest = (req, res, next) => {
    const {nombre, apellido, email} = req.body;

    if (nombre && apellido && email) next(); //(!name || !email)
    res.status(400);
    res.json({error: 'Faltan datos necesarios'})
} 

const validarExistencia = (req, res, next) => {
    const {nombre, apellido} = req.body; 

    let result = datos.find( (a) => a.nombre == nombre && a.apellido == apellido);

    if (!result) next();
    res.status(409);
    res.json({error: 'El contacto ya existe'});
}

server.get('/contactos', (req, res) => {
    res.json(datos);
});

server.post('/contacto', validarRequest, validarExistencia, (req, res) => {
    const element = req.body;

    datos.push(element);
    res.json(`El contacto ${element.nombre} ${element.apellido} se agregó exitosamente`);
});

server.use( (err, req, res, next) => {
    if(!err) return next();
    console.log('Error, algo salió mal', err);
    res.status(500).send('Error');
})