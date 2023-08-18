import { check } from "express-validator"
import httpRutas from "../controllers/rutas.js"
import { Router } from "express"

const router= Router()

  router.get("/", httpRutas.getRuta)

  router.post("/", [
    check("ciudad_origen","Campo Requerido").notEmpty(),
    check("ciudad_destino","Campo Requerido").notEmpty(),
    check("fecha_hora_origen","Campo Requerido").notEmpty(),
    check("numero_asientos","Campo Requerido").notEmpty(), 
  ] ,httpRutas.postRuta) 

  router.put("/:id", [
    check("ciudad_origen","Campo Requerido").notEmpty(),
    check("ciudad_destino","Campo Requerido").notEmpty(),
    check("fecha_hora_origen","Campo Requerido").notEmpty(),
    check("numero_asientos","Campo Requerido").notEmpty(), 
  ] ,httpRutas.putRuta) 

  router.put("/estado/:id",httpRutas.putEstadoRuta);

  /* 
  router.get("/:id", httpArticulo.getArticuloId)
  
  router.put("/:id", httpArticulo.putArticulo)
  
  router.delete("/:id", httpArticulo.deleteArticulo) */
  
  export default router