const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router();
const { verificarToken } = require("../middlewares/autenticacion");

const Platillo = require('../models/platilloModel');

//listar
router.post('/listar', verificarToken, async (req, res) => {
    const { id_restaurante } = req.body;
    const platillos = Platillo.find({id_restaurante: id_restaurante})
    .then(msg => 
        res.json({
            result:true,
            platillos: msg
        })
    )
    .catch(err => 
        res.json({
            result:false,
            message: JSON.stringify(err)
        })
    );
});

//retornar por id
router.post('/platilloPorID/', async(req, res) => {
    const { id_platillo } = req.body;
    const platillos = Platillo.findOne({_id: id_platillo}).populate("ingredientes")
    .then(msg => {
        if(!msg){
            res.json({
                result:false,
                message:'Platillo no se encuentra registrado.',
            })
        }
        else{
            res.json({
                result:true,
                message:'Platillo encontrado.',
                platillo: msg
            })
        }
    })
    .catch(err => 
        res.json({
            result:false,
            message: JSON.stringify(err)
        })
    );

});

//grabar
router.post('/registrarPlatillo/', verificarToken, async (req, res) => {

    const { nombre, 
        preparacion, 
        para_cuantos,
        tmp_preparacion,
        costo_actual,
        precio_actual, 
        categoria,
        fch_creacion,
        total_vendidos,
        //id_registrador,
        id_restaurante,
        ingredientes
    } = req.body;

    const platillo = new Platillo({
        nombre, 
        preparacion, 
        para_cuantos,
        tmp_preparacion,
        costo_actual,
        precio_actual, 
        categoria,
        fch_creacion,
        total_vendidos,
        //id_registrador,
        id_restaurante,
        ingredientes
    });
    await platillo.save()
    .then(msg => 
        res.json({
            result:true,
            message: 'Platillo guardado.',
            msg: msg
        })
    )
    .catch(err => 
        res.json({
            result:false,
            message: JSON.stringify(err)
        })
    );
});


module.exports = router;
