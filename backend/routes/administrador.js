import httpAdministrador from "../controllers/administrador.js";
import { Router } from "express";
import { check } from "express-validator";


const router = Router();

router.get("/", httpAdministrador.getAdministrador);
router.post('/inicio-sesion', httpAdministrador.iniciarSesion);

router.post("/",
[
  check("cc", "Campo requerido").notEmpty().isLength({ min: 7, max: 10 }),
  check("nombre", "campo requerido").notEmpty(),
  check("apellidos", "campo requerido").notEmpty(),
  check("password", "campo requerido").notEmpty().isLength({ min: 8 }),
  check("direccion", "campo requerido").notEmpty(),
  check("email", "Campo requerido").notEmpty(),
  check("telefono", "campo requerido").notEmpty().isLength({ min: 7, max: 10 }),
  check("rol", "Campo requerido").notEmpty()

],
  httpAdministrador.postAdministrador
);

router.put("/:id",
[
  check("nombre", "campo requerido").notEmpty(),
  check("apellidos", "campo requerido").notEmpty(),
  check("direccion", "campo requerido").notEmpty(),
  check("email", "Campo requerido").notEmpty(),
  check("telefono", "campo requerido").notEmpty().isLength({ min: 7, max: 10 }),

],
  httpAdministrador.putAdministrativo
);

// router.get("/filtrarcedula", httpAdministrador.getAdministrador);

export default router;
