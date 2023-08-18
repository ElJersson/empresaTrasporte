import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useRutasStore = defineStore('rutas', () => {
  const ciudades = ref([]);

  const getCiudades = async () => {
    try {
      const response = await axios.get('https://empresatrasporte.onrender.com/api/rutas');
      console.log(response.data); // Agrega esta línea para imprimir la respuesta en la consola
      return response
      //ciudades.value = response.data.map(ruta => ruta.ciudad_origen); // Ajusta según la estructura de tu respuesta
    } catch (error) {
      console.error(error);
      return error
    }
  };

  return {
    ciudades,
    getCiudades
  };
});