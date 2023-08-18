import {defineStore} from 'pinia'
import axios from "axios"
export const useConductorStore =defineStore(
    "conductor",()=>{

        // agregar conductor
        const addConductor = async(info)=>{
            try {
                let res = await axios.post("https://empresatrasporte.onrender.com/api/conductor",info)
                return res
            } catch (error) {
                console.log(error);
                return error
            }
        }
        // editar conductor
        const updateConductor = async (id, info) => {
          try {
            let res = await axios.put(`https://empresatrasporte.onrender.com/api/conductor/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        // editar estado bus 
        const putConductorEstado = async (id, estado) => {
          try {
            let res = await axios.put(`https://empresatrasporte.onrender.com/api/conductor/estado/${id}`, {estado:estado});
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };          

        // lista de conductor
        const getConductor= async () => {
            try {
              let res = await axios.get("https://empresatrasporte.onrender.com/api/conductor");
              console.log(res);
              return res.data.conductores; 
            } catch (error) {
              console.log(error);
              return error;
            }
          };
        // eliminart conductor 
        const deleteConductor= async (id, info) => {
          try {
            let res = await axios.delete(`https://empresatrasporte.onrender.com/api/conductor/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        return{
            addConductor,
            updateConductor,
            getConductor,
            putConductorEstado,
            deleteConductor
        }
    }
)