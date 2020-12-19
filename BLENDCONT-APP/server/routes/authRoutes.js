const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router();

const Restaurante = require('../models/restauranteModel');


router.post('/login', async (req, res) => {
    let body = req.body

    Restaurante.findOne({nombre: body.nombre}, (err, restaurante) => {
        if (!restaurante){
            res.json({
                result:false,
                message:'Restaurante no válido',
            })
        }

        else if (body.contrasenia != restaurante.contrasenia) {
            res.json({
                result:false,
                message:'Contrasenia no válida'
            })
        }
        else {
            let token = jwt.sign({
                usuariobd: body.nombre
            },'secret',{expiresIn:'1h'})
            
            res.json({
                result:true,
                message:'Bienvenido',
                restaurante:restaurante,
                token
            })
        }
        
    })
});

module.exports = router