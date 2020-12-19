const mongoose = require('mongoose');
const { schema } = require('./restauranteModel');
const { Schema } = mongoose;

const productoSchema = new Schema({
	nombre: { 
    type: String,
    required: true,
    lowercase: true,
    maxlength: 50
  },
  unidad: {
    type: String,
    required: true,
    lowercase: true,
    maxlength: 30
  },
  categoria: {
    type: String,
    required: false,
    lowercase: true,
    maxlength: 10
  },
  stock_actual: {
    // type: mongoose.Decimal128, 
    type: String,
    required: true,
  },
  id_restaurante: {
    type: Schema.Types.ObjectId,
    required: true,
  }
})

module.exports = mongoose.model('Producto', productoSchema);
