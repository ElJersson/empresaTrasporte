import {defineStore} from 'pinia'
import axios from "axios"
export const useClienteStore =defineStore(
    "client",()=>{

        // agregar cliente
        const addCliente = async(info)=>{
            try {
                let res = await axios.post("https://empresatrasporte.onrender.com/api/clientes",info)
                return res
            } catch (error) {
                console.log(error);
                return error
            }
        }
        // editar cliente 
        const updateCliente = async (id, info) => {
          try {
            let res = await axios.put(`https://empresatrasporte.onrender.com/api/clientes/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        // editar estado cliente 
        const putClienteEstado = async (id, estado) => {
          try {
            let res = await axios.put(`https://empresatrasporte.onrender.com/api/clientes/estado/${id}`,{estado:estado});
            console.log(res);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
          
        // lista de cliente activos
        const getCliente = async () => {
            try {
              let res = await axios.get("https://empresatrasporte.onrender.com/api/clientes");
              console.log(res);
              return res.data.clientes; 
            } catch (error) {
              console.log(error);
              return error;
            }
          };
        // eliminart cliente 
        const deleteCliente = async (id, info) => {
          try {
            let res = await axios.delete(`https://empresatrasporte.onrender.com/api/buses/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        return{
            addCliente,
            updateCliente,
            getCliente,
            putClienteEstado,
            deleteCliente
        }
    }
)