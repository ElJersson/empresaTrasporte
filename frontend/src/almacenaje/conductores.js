import {defineStore} from 'pinia'
import axios from "axios"
export const useConductorStore =defineStore(
    "conductor",()=>{

        // agregar conductor
        const addConductor = async(info)=>{
            try {
                let res = await axios.post("http://localhost:4500/api/conductor",info)
                return res
            } catch (error) {
                console.log(error);
                return error
            }
        }
        // editar conductor
        const updateConductor = async (id, info) => {
          try {
            let res = await axios.put(`http://localhost:4500/api/conductor/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        // editar estado bus 
        const putConductorEstado = async (id, estado) => {
          try {
            let res = await axios.put(`http://localhost:4500/api/conductor/estado/${id}`, {estado:estado});
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };          

        // lista de conductor
        const getConductor= async () => {
            try {
              let res = await axios.get("http://localhost:4500/api/conductor");
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
            let res = await axios.delete(`http://localhost:4500/api/conductor/${id}`, info);
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