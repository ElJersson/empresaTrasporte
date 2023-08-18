import Ruta from "../modules/rutas.js";

const httpRutas = {
  // Listar todas las rutas
  getRuta: async (req, res) => {
    try {
      const rutas = await Ruta.find();
      res.json({ rutas });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Agregar una nueva ruta a la base de datos
  postRuta: async (req, res) => {
    const { ciudad_origen, ciudad_destino, fecha_hora_origen ,estado } = req.body;
    const ruta = await Ruta({ ciudad_origen, ciudad_destino, fecha_hora_origen, estado });

    try {
      await ruta.save();
      res.json({ ruta });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
// actualizar estado ruta
putEstadoRuta : async (req , res) =>{
  const id = req.params.id
  const actualizado = {
    estado: req.body.estado
  }
  try{
    const rutaActualizado = await Ruta.findByIdAndUpdate(id,actualizado)
    if (rutaActualizado) {
     res.status(200).json(rutaActualizado);
    } else {
     res.status(404).json({error: 'ruta no encontrado'});
    }
  }catch (error) {
      res.status(500).json({error:'no se pudo actualizar la ruta'})
    }
     }
,
  // Modificar información de una ruta existente en la base de datos
  putRuta: async (req, res) => {
    const { id } = req.params;
    const { ciudad_origen, ciudad_destino, fecha_hora_origen, estado } = req.body;

    try {
      // Buscar la ruta por id
      const ruta = await Ruta.findById(id);

      if (!ruta) {
        return res.status(404).json({ error: "Ruta no encontrada" });
      }

      // Actualizar los campos de la ruta con los valores nuevos
      ruta.ciudad_origen = ciudad_origen;
      ruta.ciudad_destino = ciudad_destino;
      ruta.fecha_hora_origen = fecha_hora_origen;
      ruta.estado = estado;
      // Guardar los cambios en la base de datos
      await ruta.save();

      res.json({ ruta });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Eliminar una ruta existente de la base de datos
  deleteRuta: async (req, res) => {
    const { id } = req.params;

    try {
      // Buscar la ruta por id
      const ruta = await Ruta.findById(id);

      if (!ruta) {
        return res.status(404).json({ error: "Ruta no encontrada" });
      }

      // Eliminar la ruta de la base de datos
      await ruta.remove();

      res.json({ mensaje: "Ruta eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
};

export default httpRutas;
