const mongoose = require('mongoose');
const { schema } = require('./restauranteModel');
const Producto = require('./productoModel')
const { Schema } = mongoose;

const salidaProductoSchema = new Schema({
	fch_salida: {
		type: Date,
		required: true,
		default: Date.now()
	},
	cantidad: {
    type: mongoose.Decimal128,
    required: true
  },
  cst_unidad: {
    type: mongoose.Decimal128,
    required: true
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

module.exports = mongoose.model('SalidaProducto', salidaProductoSchema);