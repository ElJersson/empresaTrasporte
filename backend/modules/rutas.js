import mongoose from "mongoose";
//Rutas
const rutaSchema=new mongoose.Schema({
ciudad_origen: {type: String},
ciudad_destino: {type:String},
fecha_hora_origen: {type: Date},
createdAt:{type: Date, default:Date.now,},
estado:  { type: Boolean, default: true },
})

export default mongoose.model('Ruta', rutaSchema)