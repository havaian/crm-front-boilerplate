// Importing mongoose
import mongoose from 'mongoose';

// Calling mongoose schema
const Schema = mongoose.Schema;

// Creating buildings schema
const buildingsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
    area: {
		type: Number,
		required: true,
    },
    description: {
		type: String,
		required: true,
    },
    geometry: {
		type: Array,
		required: true,
    },
}, { timestamps: true });

const Building = mongoose.model('Book', buildingsSchema);

export default Building;