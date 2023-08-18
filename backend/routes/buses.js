import { check } from "express-validator";
import httpBus from "../controllers/buses.js";
import { Router } from "express";

const router = Router();

router.get("/", httpBus.getBus);

router.post("/",
  check("placa", "campo requerido").notEmpty(),
  check("marca", "campo requerido").notEmpty(),
  check("capacidad", "campo requerido").notEmpty(),
  check("conductor", "campo requerido").notEmpty(),
  httpBus.postBus
);

router.put("/:id",httpBus.putBus);
router.put("/estado/:id",httpBus.putEstadoBus);

router.delete("/:id", httpBus.deleteBus);


/*  router.get("/:cedula", httpPersona.getPersonaCedula)
  
  
  
  router.put("/:cedula", httpPersona.putPersona)
  
  router.delete("/:cedula",httpPersona.deletePersona) */

export default router;
