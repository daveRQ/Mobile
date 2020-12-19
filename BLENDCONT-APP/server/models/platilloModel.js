const mongoose = require('mongoose')
const { Schema } = mongoose;

const platilloSchema = new Schema({
	nombre: { 
		type: String,
		unique: true,
		maxlength: 50,
		required: true
	},
	preparacion: { 
		type: String,
		maxlength: 500,
	},
	para_cuantos: { 
		type: Number,
	},
	tmp_preparacion: { 
		type: Number,
	},
	costo_actual: { 
		type: Number,
		required: true
	},
	precio_actual: { 
		type: Number,
		required: true
	},
	categoria: { 
		type: String,
		required: true
	},
	fch_creacion: { 
		type: Date,
		required: true
	},
	total_vendidos: { 
		type: Number,
	},
	/*id_registrador: { 
		type: Schema.Types.ObjectId,
        ref: 'Restaurante'
	},*/
	id_restaurante: { 
		type: Schema.Types.ObjectId,
		ref: 'Restaurante'
	},
	ingredientes:[{
		id_ingrediente: {
			type: Schema.Types.ObjectId, 
			ref: 'Producto',
			required: true
		},
		unidad: { 
			type: String,
			maxlength: 20,
			required: true
		},
		cantidad: { 
				type: Number,
				required: true
		}
	}]
})

module.exports = mongoose.model('Platillo', platilloSchema);
