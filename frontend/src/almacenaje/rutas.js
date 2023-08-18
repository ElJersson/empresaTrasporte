import {defineStore} from 'pinia'
import axios from "axios"
export const useRutasStore =defineStore(
    "ruta",()=>{

      const addRuta = async (info) => {
        try {
          let res = await axios.post("http://localhost:4500/api/rutas", info);
          return res.data; // Devolvemos solo la propiedad data de la respuesta
        } catch (error) {
          console.log(error);
          return error;
        }
      };
        // editar Ruta 
        const updateRuta = async (id, info) => {
          try {
            let res = await axios.put(`http://localhost:4500/api/rutas/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        // editar estado Ruta 
        const putRutaEstado = async (id, estado) => {
          try {
            let res = await axios.put(`http://localhost:4500/api/rutas/estado/${id}`, {estado:estado});
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
          
          
        // lista de Ruta
        const getRuta = async () => {
            try {
              let res = await axios.get("http://localhost:4500/api/rutas");
              console.log(res);
              return res.data.rutas; 
            } catch (error) {
              console.log(error);
              return error;
            }
          };
        // eliminart Ruta 
        const deleteRuta = async (id, info) => {
          try {
            let res = await axios.delete(`http://localhost:4500/api/rutas/${id}`, info);
            return res;
          } catch (error) {
            console.log(error);
            return error;
          }
        };
        return{
            addRuta,
            updateRuta,
            getRuta,
            deleteRuta,
            putRutaEstado
        }
    }
)