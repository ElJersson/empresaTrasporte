<template>
  <div class="page-container">
    <div class="fullscreen-bg">
      <img src="/fondo.jpg" alt="Fondo de pantalla" />
    </div>
    <div class="grid-item">
      <h1>Registro</h1>
    <input v-model="email" class="form-control" type="text" placeholder="Correo Electrónico" /><br />
    <input v-model="password" class="form-control" type="password" placeholder="Contraseña" /><br />
    <div v-if="loading" class="loading"></div>
    <button class="btn" @click="login" :disabled="loading">Ingresar</button>
    <div v-if="error" class="error" style="color: rgb(255, 255, 255);">{{ error }}</div>
    <br />
     
     
    </div>
    <div class="footer-bar">
      <ul class="footer-bar-list">
        <li class="footer-bar-item"><a href="#">Política de privacidad</a></li>
        <li class="footer-bar-item"><a href="#">Términos y condiciones</a></li>
        <li class="footer-bar-item"><a href="#">Contacto</a></li>
      </ul>
    </div>
  </div>
</template>
  <script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from 'sweetalert2';
import { useAdministradorStore } from "../almacenaje/login.js";
import { router } from "../routes/routes.js"; // Asegúrate de importar el enrutador correctamente


const useAdministrador = useAdministradorStore();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);


const login = async () => {
  loading.value = true;
  error.value = null;

  try {
    await useAdministrador.iniciarSesion(email.value, password.value);
    router.push("/home");
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor ingresa un correo y contraseña válidos.',
    });
    error.value = err.message || "Error en el inicio de sesión";
  } finally {
    loading.value = false;
  }
};

//vector con todos los administradores
const administradoresActivos = ref([]);
console.log(administradoresActivos);



async function lisAdministrador() {
  let res = await useAdministrador.getAdministrador();
  administradoresActivos.value = res;
}

onMounted(async () => {
  lisAdministrador()
});
</script>
  
  <style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Acme');
  .tipos{
    width: 300px;
    height: 50px;
    border-radius: 50px;
  color: #0A2E50;
  background-color: #f4e00700;
   .page-container {
      display: flex;
      justify-content: center; /* Horizontally center the content */
      align-items: center; /* Vertically center the content */
      height: 100vh; /* Adjust as needed */
      background-color: #f4e00700; /* Set a background color for the page */
    }
  }
  
  .page-container {
      display: flex;
      justify-content: center; /* Horizontally center the content */
      align-items: center; /* Vertically center the content */
      height: 100vh; /* Adjust as needed */
      background-color: #f4e00700; /* Set a background color for the page */
    }
  .tipo{
    cursor: pointer;
    width: 350px;
    height: 50px;
    box-shadow: 10px  10px 10px rgba(13, 14, 16, 0.741);
    transform: scale(1.1);
    background :linear-gradient(-45deg, #847d7b, #ae807c92, #eceaea8f, #f9f7f6);;
  }
  .tipo:hover {
    transition: 0.2s all;
    background-color: rgb(221, 216, 204);
  }
  .tipo:active {
    
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgba(11, 12, 11, 0.938);
    /* Lowering the shadow */
  }
  
  
  
    h1 { color: #ffffff;
      font-size: 30px; 
    }
    .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    
  }
  b{
    font-family: fuente;
    color: #3a3916;
    font-size: 17px;
  }
  @font-face{
    font-family: fuente;
    src:url(src/Hodlers.ttf)
  }
  
  .btns:active{
    transform: scale(1.1);
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
  }

  .grid-item {
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 40px; /* Aumenta el espacio de relleno para agrandar la tarjeta */
  width: 500px; /* Aumenta el ancho para agrandar la tarjeta */
  background-color: #323289f0; 
  box-shadow: 5px 6px 12px rgb(0, 0, 0);
}
  .fullscreen-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
   
  }
  
  .fullscreen-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    
  }
  .loading {
  /* Add your loading indicator styles here */
  border: 4px solid #f3f3f3; /* Light gray border */
  border-top: 4px solid #3498db; /* Blue border on top */
  border-radius: 50%; /* Circular shape */
  width: 20px; /* Size of the indicator */
  height: 20px;
  animation: spin 2s linear infinite; /* Spin animation */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
  