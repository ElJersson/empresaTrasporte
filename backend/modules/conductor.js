import mongoose from "mongoose";

const conductorSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true, minlength: 7, maxlength: 10 },
  nombre: { type: String, required: true },
  numero_telefono: { type: String, minlength: 7, maxlength: 10 },
  num_licencia: { type: String, required: true, unique: true },
  tipo_licencia_conduccion: { type: String, required: true },
  estado:  { type: Boolean, default: true },
});

export default mongoose.model('Conductor', conductorSchema);
