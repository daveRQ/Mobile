const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Restaurante = require('../models/restauranteModel');
const Producto = require('./../models/productoModel');
const IngresoProducto = require('./../models/ingresoProductoModel');

//listar
// router.get('/', async (req, res) => {
// 	const restaurantes = await Restaurante.find();
// 	res.json(restaurantes);
// });

//agregar
// router.post('/agregarInventario', async (req, res) => {

// 	Restaurante.findOne({ nombre: 'restaurante 1' }, async (err, result) => {
// 		const data = { fecha: Date.now(), id_restaurante: result._id };
// 		const inventario = new Inventario(data);
// 		await inventario.save();

// 		res.json({ result: 'hi' })
// 	})
// });



// ESTO SE ENVIA
// {
//   "nombre": "papa",
//   "categoria": "tuberculo",
//   "unidad": "kilos",
//   "cantidad": 1000.5,
//   "cst_unidad": 11.3,
//   "proveedor": "xaxa",
//   "id_inventario": "5fab37a7fc48404cdc9095ab"
// }

router.post('/ingresoProducto', async (req, res) => {
  let body = req.body; // nombre - categoria - unidad - cantidad - cst_unidad 
  // proveedor - fch_ingreso - id_inventario
  console.log("\nENTRAMOS\n")
  
  if (body.id_restaurante) {
    
    Producto.find({id_restaurante: body.id_restaurante, nombre: body.nombre}, async function(err, producto) {
      if (producto.length > 0) {                
        let message = 'Datos agregados';
        let new_stock_actual = parseFloat(producto[0].stock_actual) + parseFloat(body.cantidad);

        let dataIngresoProducto = new IngresoProducto({
          cantidad: body.cantidad,
          cst_unidad: body.cst_unidad,
          fch_ingreso: Date.now(),
          proveedor: body.proveedor,
          stock_parcial: new_stock_actual,
          id_producto: producto[0]._id
        });
        await dataIngresoProducto.save();
                
        Producto.findOneAndUpdate({'_id': producto[0]._id},
          {stock_actual: new_stock_actual}, {upsert: true}, function(err, doc){});

        res.json({
          p: producto[0]._id,
          message: message
        });
      }
      else {
        let message = 'Producto nuevo';
        let dataProducto = new Producto({
          nombre: body.nombre,
          unidad: body.unidad,
          categoria: body.categoria,
          stock_actual: body.cantidad,
          id_restaurante: body.id_restaurante
        });
        
        let dataIngresoProducto = new IngresoProducto({
          cantidad: body.cantidad,
          cst_unidad: body.cst_unidad,
          fch_ingreso: Date.now(),
          proveedor: body.proveedor,
          stock_parcial: body.cantidad,
          id_producto: dataProducto._id
        });
        
        await dataIngresoProducto.save();
        await dataProducto.save();

        res.json({
          message: message
        });
      }
    });
  }
});

// { id_inventario: , fch_ini: , fch_fin: }
router.post('/stockTotal', async (req, res) => {
  console.log("---------");
  console.log(req.body.id_restaurante);
  console.log(req.body.fch_ini);
  console.log(req.body.fch_fin);
  console.log("---------");
  Producto.find({ 
    id_restaurante: req.body.id_restaurante, 
    // fch_ingreso: { $gt: req.body.fch_ini, $lt: req.body.fcg_fin }
  }).select('nombre unidad stock_actual').exec(function(err, producto) {
    console.log("---------");
    console.log(producto);
    console.log("---------");
    res.json({
      result: producto,
    })
  });
});

// { id_producto: ,  }
router.post('/ingredienteInfo', async(req, res) => {
  Producto.find({ _id: id_producto }, async function(err, producto) {
    IngresoProducto.find({ id_producto: id_producto }, async function(err, ingresoProducto) {
      res.json({
        resultProducto: producto,
        resultIngresoProducto: ingresoProducto
      });
    });
  });
});

//{ nombre: ,  }
router.post('/ProductoPorNombre', async (req, res) => {
  const { nombre } = req.body;
  const productos = Producto.findOne({nombre: nombre})
  .then(msg => {
      if(!msg){
          res.json({
              result:false,
              message:'Producto no se encuentra registrado.',
          })
      }
      else{
          res.json({
              result:true,
              message:'Producto encontrado.',
              producto: msg
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

module.exports = router;
