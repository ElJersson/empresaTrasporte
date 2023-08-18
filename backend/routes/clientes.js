import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar-campos.js"
import httpClientes from "../controllers/clientes.js"
import { Router } from "express"

const router= Router()

  router.get("/", httpClientes.getCliente)

  router.post("/",[
    check("cc","Campo requerido").notEmpty().isLength({min:7, max:10}),
    check("nombres","campo requerido").notEmpty(),
    check("apellidos","campo requerido").notEmpty(),
    check("telefono","campo requerido").notEmpty().isLength({min:7, max:10}),
    validarCampos
  ], httpClientes.postCliente)

  router.put("/:id",[
    check("nombres","campo requerido").notEmpty(),
    check("apellidos","campo requerido").notEmpty(),
    check("telefono","campo requerido").notEmpty().isLength({min:7, max:10}),
  ], httpClientes.putCliente)

  router.put("/estado/:id",httpClientes.putEstadoCliente);

  /* 
  router.get("/:id", httpArticulo.getArticuloId)
  
  router.put("/:id", httpArticulo.putArticulo)
  
  router.delete("/:id", httpArticulo.deleteAdministrador) */
  
  export default router