const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router();

const { verificarToken } = require("../middlewares/autenticacion");
const Duenio = require('../models/duenioModel');

//listar
router.get('/', verificarToken, async (req, res) => {
    const duenios = await Duenio.find();
    res.json(duenios);
});

//grabar
router.post('/', async (req, res) => {
    const { nombres, ap_paterno, ap_materno, fch_nacimiento, celular, sexo, tipo_doc, nro_doc, id_restaurante } = req.body;

    const duenio = new Duenio({
        nombres,
        ap_paterno,
        ap_materno,
        fch_nacimiento,
        celular,
        sexo,
        tipo_doc,
        nro_doc,
        id_restaurante
    });
    await duenio.save();
    res.json({
        result:true, 
        message:'Dueño registrado.'
    });
});


module.exports = router;
