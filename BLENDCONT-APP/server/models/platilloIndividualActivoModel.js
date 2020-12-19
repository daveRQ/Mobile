const mongoose = require('mongoose');
const { schema } = require('./restauranteModel');
const Restaurante = require('./restauranteModel')
const Platillo = require('./platilloModel')
const DiaOperacional = require('./diaOperacionalModel')
const { Schema } = mongoose;

const platilloIndividualActivoSchema = new Schema({
  nombre: {
    type: String,
		trim: true,
		unique: true,
		maxlength: 80,
		required: true
  },
  costo: {
    type: String,
    // type: mongoose.Decimal128, 
    required: true
  },
  precio: {
    type: String,
    // type: mongoose.Decimal128, 
    required: true
  },
  agotado: {
    type: Boolean,
    required: true
  },
	hr_agotado: {
    type: Date,
    required: false,
    default: Date.now()
  },
  vendidos: {
    type: Number,
    required: true
  },
  no_vendidos: {
    type: Number,
    required: true
  },
  id_platillo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Platillo
  },
  id_dia_operacional: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: DiaOperacional
  }
})

module.exports = mongoose.model('PlatilloIndividualActivo', platilloIndividualActivoSchema);
