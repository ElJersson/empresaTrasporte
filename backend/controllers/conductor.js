import Conductor from "../modules/conductor.js"
 const httpConductor = {

// listado conductor
    getConductor : async ( req , res) =>{
         const conductores = await Conductor.find()
        res.json({conductores})
     },


// agregar conductor a base de datos
     postConductor : async (req , res) =>{
        const { cedula , nombre, numero_telefono, num_licencia, tipo_licencia_conduccion  } = req.body
        const conductor = await Conductor ({cedula , nombre, numero_telefono, num_licencia, tipo_licencia_conduccion })
        await conductor.save()
        res.json ({conductor}) 
     },
    // editar conductores 
    putConductor: async (req, res) => {
        const { id } = req.params; // Se obtiene el parámetro 'id' desde la URL
        const { cedula, nombre, numero_telefono, num_licencia, tipo_licencia_conduccion} = req.body;
    
        try {
          // Buscar el conductor por id
          const conductor = await Conductor.findById(id);
    
          if (!conductor) {
            return res.status(404).json({ error: "conductor no encontrado" });
          }
    
        // Actualizar los campos del conductor con los valores nuevos
        conductor.cedula = cedula;
        conductor.nombre = nombre;
        conductor.numero_telefono = numero_telefono;
        conductor.num_licencia = num_licencia;
        conductor.tipo_licencia_conduccion = tipo_licencia_conduccion;
    
          // Guardar los cambios en la base de datos
          await conductor.save();
    
          res.json({ conductor });
        } catch (error) {
          res.status(500).json({ error: "Error en el servidor" });
        }
      },
     // actualizar estado conductor
    putEstadoConductor : async (req , res) =>{
      const id = req.params.id
      const actualizado = {
        estado: req.body.estado
      }
      try{
        const conductoresActualizado = await Conductor.findByIdAndUpdate(id,actualizado)
        if (conductoresActualizado) {
         res.status(200).json(conductoresActualizado);
        } else {
         res.status(404).json({error: 'conductor no encontrado'});
        }
      }catch (error) {
          res.status(500).json({error:'no se pudo actualizar el conductor'})
        }
         }
      

}



 export default httpConductor