import express from "express"
import cors from "cors"
import administrador from "../routes/administrador.js"
import buses from "../routes/buses.js"
import tiquetes from "../routes/tiquetes.js"
import rutas from "../routes/rutas.js"
import clientes from "../routes/clientes.js"
import conductor from "../routes/conductor.js"
import mongoose from 'mongoose'

class Server{
    
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarBD()
    }
    conectarBD(){
        mongoose.connect(process.env.mongoDB)
        .then(()=>console.log('conectado'))
    }

    routes(){
        this.app.use('/api/administrador',administrador)
        this.app.use('/api/buses',buses)
        this.app.use('/api/tiquetes',tiquetes)
        this.app.use('/api/rutas',rutas)
        this.app.use('/api/clientes',clientes)
        this.app.use('/api/conductor',conductor)
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }
    escuchar(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
          }) 
    } 
}   

export default Server