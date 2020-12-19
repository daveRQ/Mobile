const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Restaurante = require('../models/restauranteModel');
const Producto = require('./../models/productoModel');
const IngresoProducto = require('./../models/ingresoProductoModel');
const SalidaProducto = require('./../models/salidaProductoModel');

const Platillo = require('./../models/platilloModel');

const DiaOperacional = require('./../models/diaOperacionalModel');
const PlatilloIndividualActivo = require('./../models/platilloIndividualActivoModel');


//listar
router.post('/listarPlatillos', async (req, res) => {
  const id_restaurante = req.body.id_restaurante;
  const platillos = Platillo.find({id_restaurante: id_restaurante})
  .then(msg => {
    console.log(msg)
    res.json({
      result:true,
      platillos: msg
    })
  })
  .catch(err => 
    res.json({
      result:false,
      message: JSON.stringify(err)
    })
  );
});

// id_platillo
// id_restaurante
router.post('/diagramaBarras', async (req, res) => {
  let fecha = [];
  let ddias= [];
  let cant = [];
  await DiaOperacional.find({id_restaurante: req.body.id_restaurante})
  .then(async (dias) => {
    // TENER TODOS LOS DIAS OPERACIONALES
    let i;
    for (i = 0; i < dias.length; i++) {
      await PlatilloIndividualActivo.find({
        id_platillo: req.body.id_platillo,
        id_dia_operacional: dias[i]._id
      })
      .then(plato => {
        if (plato.length == 0) {
          fecha.push(dias[i].fch_ini);
          cant.push(0);
        }
        else {
          fecha.push(dias[i].fch_ini);
          cant.push(plato[0].vendidos);
        }
      });
    }
  });
  console.log(fecha);
  console.log(cant);

  for (let i = 1; i <= fecha.length; i++) {
    ddias.push("Dia " + i.toString());
  }

  res.json({
    fecha: fecha,
    ddias: ddias,
    cant: cant
  })
});

module.exports = router;