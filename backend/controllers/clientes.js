import Clientes from "../modules/clientes.js";

const httpClientes = {
  // Listar clientes
  getCliente: async (req, res) => {
    const clientes = await Clientes.find();
    res.json({ clientes });
  },

  // Agregar clientes a la base de datos
  postCliente: async (req, res) => {
    const { cc, nombres, apellidos, telefono } = req.body;
    const cliente = await Clientes({ cc, nombres, apellidos, telefono });
    await cliente.save();
    res.json({ cliente });
  },
// actualizar estado buses
putEstadoCliente : async (req , res) =>{
  const id = req.params.id
  const actualizado = {
    estado: req.body.estado
  }
  try{
    const clienteActualizado = await Clientes.findByIdAndUpdate(id,actualizado)
    if (clienteActualizado) {
     res.status(200).json(clienteActualizado);
    } else {
     res.status(404).json({error: 'Cliente no encontrado'});
    }
  }catch (error) {
      res.status(500).json({error:'no se pudo actualizar el cliente'})
    }
     }



  ,
  // Actualizar cliente en la base de datos por ID
  putCliente: async (req, res) => {
  const { id } = req.params; // Se obtiene el parámetro 'id' desde la URL
  const { nombres, apellidos, telefono } = req.body;

  try {
    // Buscar el cliente por id
    const cliente = await Clientes.findById(id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Validar la actualización, verificar que los campos no estén vacíos o indefinidos
    if (!nombres || !apellidos || !telefono) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Actualizar los campos del cliente con los valores nuevos
    cliente.nombres = nombres;
    cliente.apellidos = apellidos;
    cliente.telefono = telefono;

    // Guardar los cambios en la base de datos
    await cliente.save();

    res.json({ cliente });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
},


  // Eliminar cliente de la base de datos
  deleteCliente: async (req, res) => {
    const { cc } = req.params; // Se obtiene el parámetro 'cc' desde la URL

    try {
      // Buscar el cliente por cc
      const cliente = await Clientes.findOne({ cc });

      if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      // Eliminar el cliente de la base de datos
      await cliente.remove();

      res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};

export default httpClientes;