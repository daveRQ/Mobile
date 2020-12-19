const mongoose = require('mongoose')
const { Schema } = mongoose;

const restauranteSchema = new Schema({
	nombre: { 
		type: String,
		trim: true,
		unique: true,
		maxlength: 80,
		required: true
	},
	contrasenia: { 
		type: String,
		maxlength: 20,
		required: true
	},
	telefono: { 
		type: String,
		unique: true,
		trim: true,
		maxlength: 12,
		required: true
	},
	correo: { 
		type: String,
		trim: true,
		unique: true,
		maxlength: 50,
		required: true
	},	
	ruc: { 
		type: String,
		trim: true,
		unique: true,
		maxlength: 11,
		required: true
	},
	direccion: { 
		type: String,
		trim: true,
		unique: true,
		maxlength: 80,
		required: true
	},
	fch_creacion: {
		type: Date,
    required: true,
    default: Date.now()
	}
})

module.exports = mongoose.model('Restaurante', restauranteSchema);