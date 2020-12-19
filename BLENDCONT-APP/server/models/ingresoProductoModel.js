const mongoose = require('mongoose');
const { schema } = require('./restauranteModel');
const Producto = require('./productoModel')
const { Schema } = mongoose;

const ingresoProductoSchema = new Schema({
	cantidad: { 
    type: mongoose.Decimal128,
    required: true
  },
  cst_unidad: {
    type: mongoose.Decimal128, 
    required: true
  },
  fch_ingreso: {
    type: Date,
    required: true,
    default: Date.now()
  },
  proveedor: {
    type: String,
    required: false,
    lowercase: true,
    maxlength: 20
  },
  // id_registrador: {
  //   type: Schema.Types.ObjectId,
  //   ref: Inventario
  // },
  stock_parcial: {
    type: Number,
    required: true
  },
  id_producto: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Producto    
  }
})

module.exports = mongoose.model('IngresoProducto', ingresoProductoSchema);
