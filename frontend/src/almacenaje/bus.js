import {defineStore} from 'pinia'
import axios from "axios"
export const useBusStore =defineStore(
    "bus",()=>{

        // agregar bus
        const addBus = async(info)=>{
            try {
                let res = await axios.post("http://localhost:4500/api/buses",info)
                return res
            } catch (error) {
                console.log(error);
                return error
            }
        }
        // editar bus 
        const updateBus = async (id, info) => {
          try {
            let res = await axios.put(`http://localhost:4500/api/buses/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        // editar estado bus 
        const putBusEstado = async (id, estado) => {
          try {
            let res = await axios.put(`http://localhost:4500/api/buses/estado/${id}`,{estado:estado});
            console.log(res);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
          
        // lista de buses activos
        const getBus = async () => {
            try {
              let res = await axios.get("http://localhost:4500/api/buses");
              console.log(res);
              return res.data.buses; 
            } catch (error) {
              console.log(error);
              return error;
            }
          };
        // eliminart bus 
        const deleteBus = async (id, info) => {
          try {
            let res = await axios.delete(`http://localhost:4500/api/buses/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        return{
            addBus,
            updateBus,
            getBus,
            putBusEstado,
            deleteBus
        }
    }
)