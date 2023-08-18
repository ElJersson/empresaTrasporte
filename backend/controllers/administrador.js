import Administrador from "../modules/administrador.js";
const httpAdministrador = {
  iniciarSesion: async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await Administrador.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      if (admin.password !== password) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      return res.json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      return res.status(500).json({ message: "Ocurrió un error durante el inicio de sesión" });
    }
  },

  //listar los administradores
  getAdministrador: async (req, res) => {
    const administrativos = await Administrador.find();
    res.json({ administrativos });
  },

  // Agregar administrador a la base de datos
  postAdministrador: async (req, res) => {
    const { cc, nombres, apellidos, password, direccion, email, telefono } = req.body;
    const administrador = await Administrador({ cc, nombres, apellidos, password, direccion, email, telefono });
    await administrador.save();
    res.json({ administrador });
  },

  // Modificar administrativo en la base de datos
  putAdministrativo: async (req, res) => {
    const { id } = req.params; // Se obtiene el parámetro 'id' desde la URL
    const { nombres, apellidos, direccion, email, telefono } = req.body;

    try {
      // Buscar el administrativo por id
      const administrativo = await Administrador.findById(id);

      if (!administrativo) {
        return res.status(404).json({ error: "Administrativo no encontrado" });
      }

      // Actualizar los campos del administrativo con los valores nuevos
      administrativo.nombre = nombres;
      administrativo.apellidos = apellidos;
      administrativo.direccion = direccion;
      administrativo.email = email;
      administrativo.telefono = telefono;


      // Guardar los cambios en la base de datos
      await administrativo.save();

      res.json({ administrativo });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Obtener administrativo por cédula (cedula es un campo específico)
  getAdministradorByCedula: async (req, res) => {
    const { cedula } = req.body;
    const administrativo = await Administrador.find(item => item.cedula == cedula);
    res.json({ administrativo });
  },
};

export default httpAdministrador;
