import Buses from "../modules/buses.js"
 const httpBus = {

  getBus: async (req, res) => {
    try {
      const buses = await Buses.find().populate("conductor"); // Aquí utilizamos populate para obtener los datos de los conductores relacionados
      res.json({ buses });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los buses" });
    }
  },


// agregar bus a base de datos
     postBus : async (req , res) =>{
        const { numBus , placa, marca, capacidad, conductor, estado  } = req.body
        const bus = await Buses ({numBus , placa, marca, capacidad, conductor , estado  })
        await bus.save()
        res.json ({bus}) 
     },
// actualizar estado buses
    putEstadoBus : async (req , res) =>{
  const id = req.params.id
  const actualizado = {
    estado: req.body.estado
  }
  try{
    const busActualizado = await Buses.findByIdAndUpdate(id,actualizado)
    if (busActualizado) {
     res.status(200).json(busActualizado);
    } else {
     res.status(404).json({error: 'bus no encontrado'});
    }
  }catch (error) {
      res.status(500).json({error:'no se pudo actualizar el bus'})
    }
     }
,
    // editar buses 
    putBus: async (req, res) => {
        const { id } = req.params; // Se obtiene el parámetro 'id' desde la URL
        const { numBus, placa, marca, capacidad, conductor, estado } = req.body;
    
        try {
          // Buscar el bus por id
          const bus = await Buses.findById(id);
    
          if (!bus) {
            return res.status(404).json({ error: "Bus no encontrado" });
          }
    
        // Actualizar los campos del bus con los valores nuevos
          bus.numBus = numBus;
          bus.placa = placa;
          bus.marca = marca;
          bus.capacidad = capacidad;
          bus.conductor = conductor;
          bus.estado = estado;
    
          // Guardar los cambios en la base de datos
          await bus.save();
    
          res.json({ bus });
        } catch (error) {
          res.status(500).json({ error: "Error en el servidor" });
        }
      },
    
      deleteBus: async (req, res) => {
        const { id } = req.params;
      
        try {
          console.log("ID del bus a eliminar:", id);
      
          const bus = await Buses.findById(id);
          console.log("Bus encontrado en la base de datos:", bus);
      
          if (!bus) {
            return res.status(404).json({ error: "Bus no encontrado" });
          }
      
          await bus.remove();
          console.log("Bus eliminado correctamente");
      
          res.json({ mensaje: "Bus eliminado correctamente" });
        } catch (error) {
          console.error("Error al eliminar el bus:", error);
          res.status(500).json({ error: "Error en el servidor" });
        }
      }
      
}

 export default httpBus