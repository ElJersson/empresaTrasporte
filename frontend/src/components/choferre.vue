<template>
 <div class="card" style="background-color: #22227cf0; border-radius: 20px ;  box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
  /* Lowering the shadow */">
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#agregarBus"
    >
      Registrar Nueva Conductor</button
    ><br />
    <div
      class="modal fade"
      id="agregarBus"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          class="modal-content"
          style="background-color: #343499f0; border-radius: 10px"
        >
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="card-body">
              
                  <input
                  placeholder="cedula"
                    v-model="cedula"
                    type="text"
                    class="form-control"
                    aria-label="cedula"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !cedula }"
                  /><br>
                
               
                  <input
                  placeholder="nombre"
                    v-model="nombre"
                    type="text"
                    class="form-control"
                    aria-label="nombre"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !nombre }"
                  /><br>
               

              
                  <input
                  placeholder="telefono"
                    v-model="numero_telefono"
                    type="text"
                    class="form-control"
                    aria-label="numero_telefono"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !numero_telefono }"
                  /><br>
                

               
                  <input
                  placeholder="num licencia"
                    v-model="num_licencia"
                    type="text"
                    class="form-control"
                    aria-label="num_licencia"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !num_licencia }"
                  /><br>
                
              
                  <input
                  placeholder="tipo licencia"
                    v-model="tipo_licencia_conduccion"
                    type="text"
                    class="form-control"
                    aria-label="tipo_licencia_conduccion"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !tipo_licencia_conduccion }"
                  /><br>
               

                <!-- boton guardar -->
                <button
                  @click="guardar()"
                  type="button"
                  class="centrar; btn btn-success"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal editar Conductor -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          class="modal-content"
          style="background-color: #31319af0; border-radius: 10px"
        >
          <div class="modal-body">
           <h5>nombre</h5>
              <input
                v-model="editNombre"
                type="text"
                class="form-control"
                aria-label="nombre"
                aria-describedby="inputGroup-sizing-sm"
                :class="{ 'is-invalid': !nombre }"
              /><br>
           

          <h5>telefono</h5>
              <input
                v-model="editNumero_telefono"
                type="text"
                class="form-control"
                aria-label="numero_telefono"
                aria-describedby="inputGroup-sizing-sm"
                :class="{ 'is-invalid': !numero_telefono }"
              /><br>
           

          <h5>num licencia</h5>
              <input
                v-model="editNum_licencia"
                type="text"
                class="form-control"
                aria-label="num_licencia"
                aria-describedby="inputGroup-sizing-sm"
                :class="{ 'is-invalid': !num_licencia }"
              /><br>
         
          <h5>tipo licencia</h5>
              <input
                v-model="editTipo_licencia_conduccion"
                type="text"
                class="form-control"
                aria-label="tipo_licencia_conduccion"
                aria-describedby="inputGroup-sizing-sm"
                :class="{ 'is-invalid': !tipo_licencia_conduccion }"
              />
           
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="limpiarInputs()"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="actualizarConductorEditado(editConductor._id)"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="table-container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Número De Licencia</th>
            <th>Tipo De Licencia</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Inactivo/Activo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="conductor in conductoresActivos" :key="conductor.id">
            <td>{{ conductor.cedula }}</td>
            <td>{{ conductor.nombre }}</td>
            <td>{{ conductor.numero_telefono }}</td>
            <td>{{ conductor.num_licencia }}</td>
            <td>{{ conductor.tipo_licencia_conduccion }}</td>
            <td>
              <span v-if="conductor.estado" style="color: green">Activo</span>
              <span v-else style="color: red">Inactivo</span>
            </td>
            <td>
              <!-- boton  modal editar conductor -->
              <button
                style="border-radius: 10px"
                type="button"
                @click="editarConductor(conductor)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa-solid fa-pen fa-lg" style="color: #000000"></i>
              </button>
            </td>
             <td>
              <label class="switch"> 
                <input @click="editEstado(conductor)" v-model="conductor.estado" :checked="conductor.estado"  type="checkbox"  />
                <span class="slider round"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { useConductorStore } from "../almacenaje/conductores.js";


//variable tienda conductores
const useConductor = useConductorStore();

//variables modal agregar
let cedula = ref("");
let nombre = ref("");
let numero_telefono = ref("");
let num_licencia = ref("");
let tipo_licencia_conduccion = ref("");

let conductorSeleccionado = ref(null);

let data = ref([]);

//variables modal editar
let editCedula = ref("");
let editNombre = ref("");
let editNumero_telefono = ref("");
let editNum_licencia = ref("");
let editTipo_licencia_conduccion = ref("");

const conductoresActivos = ref([]);


async function guardar() {
  // Realizar validaciones
  if (
    !cedula.value ||
    !nombre.value ||
    !numero_telefono.value ||
    !num_licencia.value ||
    !tipo_licencia_conduccion.value
  ) {
    // Mostrar una alerta temporal de error en caso de campos vacíos
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, completa todos los campos.",
    });
    return;
  }

  let r = await useConductor.addConductor({
    cedula: cedula.value,
    nombre: nombre.value,
    numero_telefono: numero_telefono.value,
    num_licencia: num_licencia.value,
    tipo_licencia_conduccion: tipo_licencia_conduccion.value,
  });
  await lisConductor();

  // Mostrar una alerta temporal de éxito
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "Los datos se agregaron con éxito.",
  }).then((result) => {
    if (result.isConfirmed) {
      const agregarConductorModal = document.getElementById("agregarBus");
      const modalConductorInstance = bootstrap.Modal.getInstance(agregarConductorModal);
      modalConductorInstance.hide();
    }
  });

  // Limpiar los campos después de agregar los datos
  limpiarInputs();
}

async function traerConductor() {
  let res = await useConductor.getConductor();
  console.log(res);
  data.value = res.data.conductores;
}

let editConductor = ref(null); // Agrega esta variable en la parte superior de tu código.

function editarConductor(conductor) {
  editConductor.value = conductor;
  editCedula.value = conductor.cedula;
  editNombre.value = conductor.nombre;
  editNumero_telefono.value = conductor.numero_telefono;
  editNum_licencia.value = conductor.num_licencia;
  editTipo_licencia_conduccion.value = conductor.tipo_licencia_conduccion;
}


const lisConductor = async()=>{
  conductoresActivos.value =await useConductor.getConductor();
 console.log(conductoresActivos.value);
}

// Función para editar el conductor seleccionado
async function actualizarConductorEditado(id) {
  try {
    await useConductor.updateConductor(id, {
      cedula: editCedula.value,
      nombre: editNombre.value,
      numero_telefono: editNumero_telefono.value,
      num_licencia: editNum_licencia.value,
      tipo_licencia_conduccion: editTipo_licencia_conduccion.value,
    });
    // Cerrar el modal manualmente
    const editarConductorModal = document.getElementById("staticBackdrop");
    const modalConductorInstance = bootstrap.Modal.getInstance(editarConductorModal);
    modalConductorInstance.hide();

    // Actualizar la lista de buses en la tabla.
    await lisConductor();

    // Mostrar un mensaje de éxito.
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Los datos se editaron con éxito.",
    });
  } catch (error) {
    console.error(error);
    // Mostrar un mensaje de error en caso de fallo.
    alert(
      "Hubo un error al actualizar el bus. Por favor, inténtalo nuevamente."
    );
  }
}

async function editEstado(conductoresActivos) {
  try {
    if (conductoresActivos.estado === true) {
      await useConductor.putConductorEstado(conductoresActivos._id , false)
    } else {
      await useConductor.putConductorEstado(conductoresActivos._id , true)
    }
    
  } catch (error) {
    console.error('error en editar estado',error);
  }
}




function limpiarInputs() {
  cedula.value = "";
  nombre.value = "";
  numero_telefono.value = "";
  num_licencia.value = "";
  tipo_licencia_conduccion.value = "";
  conductorSeleccionado.value = null;
}

onMounted(async () => {
lisConductor()
}); 

</script>

<style scoped>
.card-container {
  margin: 10px; /* Agrega un margen exterior */
  display: flex;
  justify-content: center;
}

.card {
  width: 90%; /* Ajusta el ancho de la tarjeta según tus preferencias */
  margin: 10px; /* Ajusta el margen interior de la tarjeta según tus preferencias */
  background-color: #282880f0;
  padding: 20px; /* Ajusta el espaciado interno de la tarjeta según tus preferencias */
  border-radius: 20px;
}
</style>