<template>
 <div class="card" style="background-color: #22227cf0; border-radius: 20px ;  box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
  /* Lowering the shadow */">
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#agregarBus"
    >
      Registrar Nuevo Cliente</button
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
          style="background-color: #3a3a90f0; border-radius: 10px"
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
                  placeholder="num documento"
                    v-model="cc"
                    type="text"
                    class="form-control"
                    aria-label="cc"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !cc }"
                  /><br>
               
                  <input
                  placeholder="nombres"
                    v-model="nombres"
                    type="text"
                    class="form-control"
                    aria-label="nombres"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !nombres }"
                  /><br>
               
                  <input
                  placeholder="apellidos"
                    v-model="apellidos"
                    type="text"
                    class="form-control"
                    aria-label="apellidos"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !apellidos }"
                  /><br>
              
                  <input
                  placeholder="telefono"
                    v-model="telefono"
                    type="text"
                    class="form-control"
                    aria-label="telefono"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !telefono }"
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

    <!-- modal editar cliente -->
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
          style="background-color: #2b2b7df0; border-radius: 10px"
        >
          <div class="modal-body">
            <h5>nombres</h5>
                  <input
                    v-model="editNombres"
                    type="text"
                    class="form-control"
                    aria-label="editNombres"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !editNombres }"
                  /><br>
                  <h5>numero documento</h5>
                  <input
                    v-model="editCc"
                    type="text"
                    class="form-control"
                    aria-label="editApellidos"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !editCc }"
                  /><br>
                  <h5>apellidos</h5>
                  <input
                    v-model="editApellidos"
                    type="text"
                    class="form-control"
                    aria-label="editApellidos"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !editApellidos }"
                  /><br>
                  <h5>telefono</h5>
                  <input
                    v-model="editTelefono"
                    type="text"
                    class="form-control"
                    aria-label="editTelefono"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !editTelefono }"
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
              @click="actualizarClienteEditado(editCliente._id)"
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
            <th>Número de Cedula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Inactivo/Activo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientesActivos" :key="cliente.id && cliente.id">
            <td>{{ cliente.cc }}</td>
            <td>{{ cliente.nombres }}</td>
            <td>{{ cliente.apellidos }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>
              <span v-if="cliente.estado" style="color: green">Activo</span>
              <span v-else style="color: red">Inactivo</span>
            </td>
            <td>
              <!-- boton  modal editar cliente -->
              <button
                style="border-radius: 10px"
                type="button"
                @click="editarCliente(cliente)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa-solid fa-pen fa-lg" style="color: #000000"></i>
              </button>
            </td>
            <td>
              <label class="switch">
                <input @click="editEstado(cliente)" v-model="cliente.estado" :checked="cliente.estado" type="checkbox"  />
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
import { useClienteStore } from "../almacenaje/clientes.js";

const useCliente = useClienteStore();

//variables modal agregar
let cc = ref("");
let nombres = ref("");
let apellidos = ref("");
let telefono = ref();
let estado = ref(false);

let data = ref([]);
let clienteSeleccionado = ref(null);

//variables modal editar
let editCc =ref("");
let editNombres= ref("");
let editApellidos =ref("");
let editTelefono = ref(0);


const clientesActivos = ref([]);

async function guardar() {
  // Realizar validaciones
  if (
    !nombres.value ||
    !nombres.value ||
    !telefono.value ||
    !cc.value 
  ) {
    // Mostrar una alerta temporal de error en caso de campos vacíos
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, completa todos los campos.",
    });
    return;
  }

  let r = await useCliente.addCliente({
    cc: cc.value,
    nombres: nombres.value,
    apellidos: apellidos.value,
    telefono: telefono.value  });
  await lisCliente();

  // Mostrar una alerta temporal de éxito
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "Los datos se agregaron con éxito.",
  }).then((result) => {
    if (result.isConfirmed) {
      const agregarClienteModal = document.getElementById("agregarClientes");
      const modalClienteInstance = bootstrap.Modal.getInstance(agregarClienteModal);
      modalClienteInstance.hide();
    }
  });

  // Limpiar los campos después de agregar los datos
  limpiarInputs();
}

async function traerCliente() {
  let res = await useCliente.getCliente();
  console.log(res);
  data.value = res.data.clientes;
}

let editCliente = ref(null); // Agrega esta variable en la parte superior de tu código.

function editarCliente(cliente) {
  editCliente.value = cliente;
  editNombres.value = cliente.nombres;
  editApellidos.value = cliente.apellidos;
  editTelefono.value = cliente.telefono;
  editCc.value = cliente.cc;
}

async function lisCliente() {
  let res = await useCliente.getCliente();
  clientesActivos.value = res;
}

// Función para editar el cliente seleccionado
async function actualizarClienteEditado(id) {
  try {
    await useCliente.updateCliente(id, {
      nombres: editNombres.value,
      apellidos: editApellidos.value,
      telefono: editTelefono.value,
      cc:editCc.value
    });
    // Cerrar el modal manualmente
    const editarClienteModal = document.getElementById("staticBackdrop");
    const modalClienteInstance = bootstrap.Modal.getInstance(editarClienteModal);
    modalClienteInstance.hide();

    // Actualizar la lista de buses en la tabla.
    await lisCliente();

    // Mostrar un mensaje de éxito.
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Los datos se editaron con éxito.",
    });
  } catch (error) {
    console.error(error);
    // Mostrar un mensaje de error en caso de fallo.
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "hubo un error al actualizar bus porfavor intenta mas tarde.",
    });
  }
}

// funcion para editar el estado de los buses 
async function editEstado(clientesActivos) {
  try {
    if (clientesActivos.estado === true) {
      await useCliente.putClienteEstado(clientesActivos._id , false)
    } else {
      await useCliente.putClienteEstado(clientesActivos._id , true)
    }
    
  } catch (error) {
    console.error('error en editar estado',error);
  }
}

function limpiarInputs() {
  cc.value ="";
  nombres.value = "";
  apellidos.value ="";
  telefono.value = 0;
  clienteSeleccionado.value = null;
}

onMounted(async () => {
  lisCliente();
});
</script>

<style>
.centrar {
  display: flex;
  justify-content: center;
}
.table-container {
  width: 100%;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  margin: 0 auto; /* Agrega esta línea para centrar horizontalmente */
}

.card-container {
  margin: 10px; /* Agrega un margen exterior */
  display: flex;
  justify-content: center;
}

.card {
  width: 90%; /* Ajusta el ancho de la tarjeta según tus preferencias */
  margin: 10px; /* Ajusta el margen interior de la tarjeta según tus preferencias */
  background-color: #78787df0;
  padding: 20px; /* Ajusta el espaciado interno de la tarjeta según tus preferencias */
}
h2{
  color: azure;
}
h5{
  color: azure;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>