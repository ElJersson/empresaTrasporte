import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  numBus: { type: Number, required: true },
  placa: { type: String, required: true, unique: true },
  marca: { type: String, required: true },
  capacidad: { type: Number, required: true },
  conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' ,require:true}, // Referencia al modelo "Conductores"
  estado: { type: Boolean, default: true }, // Cambiado el tipo de String a Boolean y establecido un valor por defecto
  fecha_creacion: { type: Date, default: Date.now }
});

export default mongoose.model('Buses', busSchema);

