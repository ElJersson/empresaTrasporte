import { check } from "express-validator";
import httpConductor from "../controllers/conductor.js";
import { Router } from "express";

const router = Router();

// Ruta para obtener todos los conductores
router.get("/", httpConductor.getConductor);


// Ruta para crear un nuevo conductor
router.post("/", [
  // check("cedula", "Campo requerido").notEmpty().isLength({ min: 7, max: 10 }),
  // check("nombre", "Campo requerido").notEmpty(),
  // check("numero_telefono", "Campo requerido").notEmpty().isLength({ min: 7, max: 10 }),
  // check("tipo_licencia_conduccion", "Campo requerido").notEmpty(),
], httpConductor.postConductor);




// Ruta para actualizar un conductor por su ID
router.put("/:id", [
  check("nombre", "Campo requerido").notEmpty(),
  check("cedula", "Campo requerido").notEmpty().isLength({ min: 7, max: 10 }),
  check("num_licencia", "Campo requerido").notEmpty().isEmail(),
  check("tipo_licencia_conduccion", "Campo requerido").notEmpty(),
], httpConductor.putConductor);

router.put("/estado/:id",httpConductor.putEstadoConductor);


export default router;
