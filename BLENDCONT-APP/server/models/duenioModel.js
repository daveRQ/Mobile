const mongoose = require('mongoose')
const { Schema } = mongoose;
const Restaurante = require('./restauranteModel')

const duenioSchema = new Schema({
	nombres: { 
		type: String,
		unique: true,
		trim: true,
		maxlength: 20,
		required: true
	},
	ap_paterno: { 
		type: String,
		unique: true,
		trim: true,
		maxlength: 10,
		required: true
	},
	ap_materno: { 
		type: String,
		unique: false,
		trim: true,
		maxlength: 10,
		required: true
	},
	fch_nacimiento: { 
		type: Date,
		unique: true,
		required: true
	},
	celular: { 
		type: String,
		unique: true,
		trim: true,
		maxlength: 12,
		required: true
	},
	sexo: { 
		type: String,
		unique: true,
		maxlength: 1,
		required: true
	},
	tipo_doc: { 
		type: String,
		unique: true,
		maxlength: 3,
		required: true
	},
	nro_doc: { 
		type: String,
		unique: true,
		trim: true,
		maxlength: 10,
		required: true
	},
	id_restaurante: { 
		type: Schema.Types.ObjectId,
        ref: Restaurante,
		required: true
	}
})

module.exports = mongoose.model('Duenio', duenioSchema);