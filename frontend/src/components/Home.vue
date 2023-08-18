<template>
  <div>
  <div class="page-container">
    <div class="fullscreen-bg">
  <img src="/fondo.jpg" alt="Fondo de pantalla">
</div>

    <div class="toolbar">
  <ul class="toolbar-list">
    <i class="fa-solid fa-bars fa-2xl" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style="color: #ffffff;margin-left: 10px;"></i>
    <li class="toolbar-item toolbar-item-start">
      <!-- <a href="#">Inicio</a> -->
 <router-link to="/home">Inicio</router-link>

      </li>
   
    <li class="toolbar-item"><a @click="cerrarSesion">Cerrar sesion</a></li>
  </ul>
</div>


<div class="offcanvas offcanvas-start" style="background-color: rgba(34, 21, 120, 0.896);" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel" style="color: #ffffff;">Administrador</h5>
    <button type="button" class="btn-close" style="background-color: #ffffff;" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
 <router-link to="/busesre"><button  data-bs-dismiss="offcanvas" class="btn2"><i class="fa-solid fa-book fa-xl" style="color: #050505;"></i> buses registrados </button></router-link><br><br> 
 <router-link to="/choferre"><button   data-bs-dismiss="offcanvas" class="btn2"><i class="fa-solid fa-user-tie fa-xl" style="color: #121212;"></i> choferes registrados</button></router-link><br><br> 
 <router-link to="/tikete"><button  data-bs-dismiss="offcanvas" class="btn2"><i class="fa-solid fa-ticket fa-xl" style="color: #0a0a0a;"></i> Comprar tikete</button> </router-link><br><br> 
 <router-link to="/clientes"><button  data-bs-dismiss="offcanvas" class="btn2"><i class="fa-solid fa-user fa-xl" style="color: #000000;"></i> clientes</button> </router-link><br><br>
 <router-link to="/rutass"><button  data-bs-dismiss="offcanvas" class="btn2"><i class="fa-solid fa-route fa-xl" style="color: #000000;"></i> rutas</button> </router-link><br><br>
 
  </div>
</div>

<router-view></router-view>
<img src="/logo.png" style="width: 300px; height: 300px; z-index: -1; position: absolute;" >
    
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
import { router } from "../routes/routes.js"; // Asegúrate de importar el enrutador correctamente
// Agregar la función para cerrar la sesión
const cerrarSesion = () => {
  // Mostrar un cuadro de diálogo de confirmación
  const confirmarCerrar = window.confirm("¿Estás seguro de que deseas cerrar la sesión?");

  if (confirmarCerrar) {

    router.push("/");
  }};
</script>

<style >
.btn2{
  width: 350px;
  height: 50px;
  border-radius: 10px;

}
.btn2:hover{
background-color: #d1dde7;
}
.btn2:active{
  transform: scale(1.1);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
}
.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0c145e;
  color: #fff;
  height: 60px;
}
.texto{
  box-shadow:10px 10px 10px  #0a0909;
  border-radius: 5px;
}
.page-container {
    display: flex;
    justify-content: center; /* Horizontally center the content */
    align-items: center; /* Vertically center the content */
    height: 100vh; /* Adjust as needed */
    background-color: #142a8900; /* Set a background color for the page */
  }
.toolbar-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

.toolbar-item {
  margin: 0 10px;
}
.btn {
  text-decoration: none;
  border: none;
  padding: 13px 21px;
  font-size: 15px;
  background-color: rgb(255, 255, 255);
  color: #080707f3;
  border-radius: 20px;
  box-shadow: 10px  10px 10px rgba(13, 14, 16, 0.741);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;

}
.btn:hover {
  color: #fff;
  background-color: rgb(48, 92, 204);
}
.btn:active {
  transform: scale(1.1);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
  /* Lowering the shadow */
}
.toolbar-item-start {
  margin-left: auto;
}

.toolbar-item a {
  
  text-decoration: none;
}

.toolbar-item a:hover {
  text-decoration: underline;
}
.imagen{
width: 40px;
height: 40px;
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

.grid-item {
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 10px 100px;
  background-color: #13137822; 
  box-shadow: 5px 6px 12px rgb(0, 0, 0);
}


.grid-item {
  transition: transform 0.3s ease;
}

.grid-item.highlighted {
  transform: scale(1.3);
  background-color: #d1dde7;
  
}
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #0c145e;
  color: #fff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-bar-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.footer-bar-item {
  margin: 0 10px;
}

.footer-bar-item a {
  color: #fff;
  text-decoration: none;
}

.footer-bar-item a:hover {
  text-decoration: underline;
}
</style>
