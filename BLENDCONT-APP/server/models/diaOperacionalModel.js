const mongoose = require('mongoose');
const { schema } = require('./restauranteModel');
const Restaurante = require('./restauranteModel')
const Platillo = require('./platilloModel')
const { Schema } = mongoose;

const diaOperacionalSchema = new Schema({
  fch_ini: {
    type: Date,
    required: true,
    default: Date.now()
  },
  fch_fin: {
    type: Date,
    required: false
  },
	plato_perro: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: Platillo
  },
  plato_estrella: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: Platillo
  },
  id_restaurante: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Restaurante
  }
})

module.exports = mongoose.model('DiaOperacional', diaOperacionalSchema);
