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

// crear dia operacional
// id_restaurante
router.post('/crearDiaOperacional', async(req, res) => {
  console.log("ATRAASFLQMQWMPQWMVPQWVPQKWVPQWKVP --------");
  const platillos = Platillo.find({id_restaurante: req.body.id_restaurante})
  .then(arrayPlatillos => {

    const diaOperacional = new DiaOperacional({
      fch_ini: Date.now(),
      fch_fin: undefined,
      plato_perro: undefined,
      plato_estrella: undefined,
      id_restaurante: req.body.id_restaurante
    });
    diaOperacional.save();    
  
    let i;
    for (i = 0; i < arrayPlatillos.length; i++) {
      Platillo.findById(arrayPlatillos[i])
      .then(item => {
        const platilloIndividualActivo = new PlatilloIndividualActivo({
          nombre: item.nombre,
          costo: item.costo_actual,
          precio: item.precio_actual,
          agotado: false,
          hr_agotado: undefined,
          vendidos: 0,
          no_vendidos: 0,
          id_platillo: item._id,
          id_dia_operacional: diaOperacional._id
        });
        platilloIndividualActivo.save();
        console.log("-------------");
        console.log("AGREGADO BIEN");
        console.log("-------------");
      })
    }
  
    console.log("-------------");
    console.log("TERMINAMOS");
    console.log("-------------");
  
    res.json({
      result: "Dia Operacional Creado",
      id: diaOperacional._id
    });
  });
});


router.post('/listarDiaOperacional', async(req, res) => {
  const id_dia_operacional = req.body.id_dia_operacional;
  const platilloIndividualActivo = PlatilloIndividualActivo.find({id_dia_operacional: id_dia_operacional})
  .then(msg => {
    res.json({
        result:true,
        platillos: msg
    })
  })
  .catch(err => 
    res.json({
        result: false,
        message: JSON.stringify(err)
    })
  );
});

router.post('/agregarVenta', async(req, res) => {
  // VENDIDOS ++
  const platilloIndividualActivo = PlatilloIndividualActivo.find({'_id': req.body.id_platillo})
  .then(async (msg) => {    
    if (msg.vendidos != 0) {
      // VENDIDOS ++
      PlatilloIndividualActivo.findOneAndUpdate({'_id': req.body.id_platillo},
      {vendidos: (msg[0].vendidos + 1)}, {upsert: true}, function(err, doc){});
    
      let id_perro = undefined;
      let perro = 99999;
      let nombre_perro = undefined;
      let id_estrella = undefined;
      let estrella = -1;
      let nombre_estrella = undefined;
    
      // halla el plato perro y estrella
      await PlatilloIndividualActivo.find({id_dia_operacional: msg[0].id_dia_operacional})
      .then(items => {
        let i;
        for (i = 0; i < items.length; i++) {
          if (items[i].vendidos < perro) {
            perro = items[i].vendidos;
            id_perro = items[i]._id;
            nombre_perro = items[i].nombre;
          }
          if (items[i].vendidos > estrella) {
            estrella = items[i].vendidos;
            id_estrella = items[i]._id;
            nombre_estrella = items[i].nombre;
          }
        }
        // Cambios en el dia operacional
        DiaOperacional.findOneAndUpdate({'_id': msg[0].id_dia_operacional},
          {fch_fin: Date.now(), plato_perro: id_perro, plato_estrella: id_estrella },
          {upsert: true}, function(err, doc){});
      });


      
      res.json({
        result: true,
        message: "Venta agregada",
        nombre_perro: nombre_perro,
        valor_perro: perro,
        nombre_estrella: nombre_estrella,
        valor_estrella: estrella
      });
    }
  })
  .catch(err => 
    res.json({
        result: false,
        message: JSON.stringify(err)
    })
  );
});

// id_platillo_individual_activo
router.post('/quitarVenta', async(req, res) => {
  const platilloIndividualActivo = PlatilloIndividualActivo.find({'_id': req.body.id_platillo})
  .then(async (msg) => {    
    if (msg[0].vendidos != 0) {
      // VENDIDOS --
      PlatilloIndividualActivo.findOneAndUpdate({'_id': req.body.id_platillo},
        {vendidos: (msg[0].vendidos - 1)}, {upsert: true}, function(err, doc){});
      
      let id_perro = undefined;
      let perro = 99999;
      let nombre_perro = undefined;
      let id_estrella = undefined;
      let estrella = -1;
      let nombre_estrella = undefined;
    
      // halla el plato perro y estrella
      await PlatilloIndividualActivo.find({id_dia_operacional: msg[0].id_dia_operacional})
      .then(items => {
        let i;
        for (i = 0; i < items.length; i++) {
          if (items[i].vendidos < perro) {
            perro = items[i].vendidos;
            id_perro = items[i]._id;
            nombre_perro = items[i].nombre;
          }
          if (items[i].vendidos > estrella) {
            estrella = items[i].vendidos;
            id_estrella = items[i]._id;
            nombre_estrella = items[i].nombre;
          }
        }
        // Cambios en el dia operacional
        DiaOperacional.findOneAndUpdate({'_id': msg[0].id_dia_operacional},
          {fch_fin: Date.now(), plato_perro: id_perro, plato_estrella: id_estrella },
          {upsert: true}, function(err, doc){});
      });

      res.json({
        result: true,
        message: "Venta quitada",
        nombre_perro: nombre_perro,
        valor_perro: perro,
        nombre_estrella: nombre_estrella,
        valor_estrella: estrella
      });
    }
    else {
      res.json({
        result: true,
        message: "Error"
      });
    }
  })
  .catch(err => 
    res.json({
        result: false,
        message: JSON.stringify(err)
    })
  );
});

// id_platillo_individual_activo
router.post('/cambiarAgotado', async(req, res) => {
  const platilloIndividualActivo = PlatilloIndividualActivo.find({'_id': req.body.id_platillo_individual_activo})
  .then(msg => {
    if (msg.agotado) {
      PlatilloIndividualActivo.findOneAndUpdate({'_id': req.body.id_platillo_individual_activo},
        {agotado: true, hr_agotado: Date.now()}, {upsert: true}, function(err, doc){});
      
      res.json({
        result: true,
        message: "Producto agotado"
      });
    }
    else {
      PlatilloIndividualActivo.findOneAndUpdate({'_id': req.body.id_platillo_individual_activo},
        {agotado: false, hr_agotado: undefined}, {upsert: true}, function(err, doc){});

      res.json({
        result: true,
        message: "Producto no agotado"
      });
    }
  })
  .catch(err => 
    res.json({
        result: false,
        message: JSON.stringify(err)
    })
  );
});

// id_dia_operacional
router.post('/terminarDiaOperacional', async(req, res) => {
  let id_perro = undefined;
  let perro = 99999;
  let id_estrella = undefined;
  let estrella = -1;

  
  // halla el plato perro y estrella
  PlatilloIndividualActivo.find({id_dia_operacional: req.body.id_dia_operacional})
  .then(items => {
    let i;
    for (i = 0; i < items.length; i++) {
      if (items[i].vendidos < perro) {
        perro = items[i].vendidos;
        id_perro = items[i]._id;
      }
      if (items[i].vendidos > estrella) {
        estrella = items[i].vendidos;
        id_estrella = items[i]._id;
      }
    }

    // Cambios en el dia operacional
    DiaOperacional.findOneAndUpdate({'_id': req.body.id_dia_operacional},
      {fch_fin: Date.now(), plato_perro: id_perro, plato_estrella: id_estrella },
      {upsert: true}, function(err, doc){});
  
    res.json({
      message: "Dia terminado"
    });

  });

  

  // disminuye los ingredientes COMPLETAR
  //COMPLETAR
  // PlatilloIndividualActivo.find({id_dia_operacional: req.body.id_dia_operacional})
  // .then(items => {
  //   let i;
  //   for (i = 0; i < items.length; i++) {
  //     let total_a_quitar = 0;
  //     let j;
  //     for (j = 0; j < items.ingredientes.length; i++) {
  //       Producto.find({_id: items.ingredientes[j].id_ingrediente})
  //       .then(items => {
  //         let i;
  //         for (i = 0; i < items.length; i++) {
  //           if (items[i].vendidos < perro) {
  //             perro = items[i].vendidos;
  //             id_perro = items[i]._id;
  //           }
  //           if (items[i].vendidos > estrella) {
  //             estrella = items[i].vendidos;
  //             id_estrella = items[i]._id;
  //           }
  //         }
  //       });
  //     }
  //   }
  // });

});

module.exports = router;