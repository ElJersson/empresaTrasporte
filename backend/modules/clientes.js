import mongoose from "mongoose";
//Usuarios
const usuarioSchema=new mongoose.Schema({
    cc: {type: String, required:true, unique: true},
    nombres: {type:String, required: true},
    apellidos: {type:String, required: true},
    telefono: {type: Number,minlength:7,maxlength:10,},
    estado:  { type: Boolean, default: true },
    createdAt:{type: Date, default:Date.now,},
})

export default mongoose.model('Clientes', usuarioSchema)