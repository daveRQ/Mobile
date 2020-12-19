const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router();

const Restaurante = require('../models/restauranteModel');

//listar
router.get('/', async (req, res) => {
    const restaurantes = await Restaurante.find(); 
    res.json(restaurantes);
});

//grabar
router.post('/registrarRestaurante/', async (req, res) => {

    const { nombre, contrasenia, telefono, correo, ruc, direccion } = req.body;

    const restaurante = new Restaurante({
        nombre,
		contrasenia,
		telefono,
		correo,
		ruc,
		direccion
    });
    await restaurante.save()
    .then(msg => 
        res.json({
            result:true,
            message: 'Restaurante guardado.'
        })
    )
    .catch(err => 
        res.json({
            result:false,
            message:  JSON.stringify(err)
        })
    );
});


module.exports = router;
