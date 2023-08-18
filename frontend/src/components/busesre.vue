<template>
 <div class="card" style="background-color: #292983; border-radius: 20px ;  box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
  /* Lowering the shadow */">
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#agregarBus"
    >
      registrar nuevo bus</button
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
          style="background-color: #232393f0; border-radius: 10px"
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
                <!-- input numero del bus -->
              
                  <input
                  placeholder="num bus"
                    v-model="numBus"
                    type="number"
                    class="form-control"
                    aria-label="Conductor"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !numBus }"
                  /><br>
               
             
                  <input
                  placeholder="conductor"
                    v-model="conductor"
                    type="text"
                    class="form-control"
                    aria-label="Conductor"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !conductor }"
                  /><br>
          

              
                  <input
                  placeholder="capacidad"
                    v-model="capacidad"
                    type="number"
                    class="form-control"
                    aria-label="capacidad"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !capacidad }"
                  />
                  <br>

              
                  <input
                  placeholder="placa"
                    v-model="placa"
                    type="text"
                    class="form-control"
                    aria-label="placa"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !placa }"
                  />
                  <br>
             
                  <input
                  placeholder="marca"
                    v-model="marca"
                    type="text"
                    class="form-control"
                    aria-label="marca"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !marca }"
                  />
                  <br>

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

    <!-- modal editar bus -->
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
          style="background-color: #292988f0; border-radius: 10px"
        >
          <div class="modal-body">
           <h5>num bus</h5>
              <input
              placeholder="num bus"
                v-model="editNumBus"
                type="text"
                class="form-control"
                aria-label="Conductor"
                aria-describedby="inputGroup-sizing-sm"
              />
            
              <h5>conductor</h5>
              <input
              placeholder="conductor"
                v-model="editConductor"
                type="text"
                class="form-control"
                aria-label="Conductor"
                aria-describedby="inputGroup-sizing-sm"
              />
            

              <h5>capacidad</h5>
              <input
                v-model="editCapacidad"
                type="text"
                class="form-control"
                aria-label="capacidad"
                aria-describedby="inputGroup-sizing-sm"
              />
           

              <h5>placa</h5>
              <input
                v-model="editPlaca"
                type="text"
                class="form-control"
                aria-label="placa"
                aria-describedby="inputGroup-sizing-sm"
              />
           
              <h5>marca</h5>
              <input
                v-model="editMarca"
                type="text"
                class="form-control"
                aria-label="marca"
                aria-describedby="inputGroup-sizing-sm"
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
              @click="actualizarBusEditado(editBus._id)"
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
            <th>Número de Bus</th>
            <th>Capacidad</th>
            <th>Placa</th>
            <th>Conductor</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Inactivo/Activo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bus in busesActivos" :key="bus.id && bus.id">
            <td>{{ bus.numBus }}</td>
            <td>{{ bus.capacidad }}</td>
            <td>{{ bus.placa }}</td>
            <td>{{ bus.conductor }}</td>
            <td>{{ bus.marca }}</td>
            <td>
              <span v-if="bus.estado" style="color: green">Activo</span>
              <span v-else style="color: red">Inactivo</span>
            </td>
            <td>
              <!-- boton  modal editar bus -->
              <button
                style="border-radius: 10px"
                type="button"
                @click="editarBus(bus)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa-solid fa-pen fa-lg" style="color: #000000"></i>
              </button>
            </td>
            <td>
              <label class="switch">
                <input @click="editEstado(bus)" v-model="bus.estado" :checked="bus.estado" type="checkbox"  />
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
import { useBusStore } from "../almacenaje/bus.js";

const useBus = useBusStore();
let capacidad = ref();
let marca = ref("");
let placa = ref("");
let conductor = ref("");
let data = ref([]);
let estado = ref(false);
let numBus = ref();
let busSeleccionado = ref(null);
let editNumBus = ref(0);
let editConductor = ref("");
let editCapacidad = ref(0);
let editPlaca = ref("");
let editMarca = ref("");

const busesActivos = ref([]);

async function guardar() {
  // Realizar validaciones
  if (
    !numBus.value ||
    !conductor.value ||
    !capacidad.value ||
    !placa.value ||
    !marca.value
  ) {
    // Mostrar una alerta temporal de error en caso de campos vacíos
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, completa todos los campos.",
    });
    return;
  }

  let r = await useBus.addBus({
    placa: placa.value,
    marca: marca.value,
    conductor: conductor.value,
    capacidad: capacidad.value,
    numBus: numBus.value,
  });
  await lisBus();

  // Mostrar una alerta temporal de éxito
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "Los datos se agregaron con éxito.",
  }).then((result) => {
    if (result.isConfirmed) {
      const agregarBusModal = document.getElementById("agregarBus");
      const modalBusInstance = bootstrap.Modal.getInstance(agregarBusModal);
      modalBusInstance.hide();
    }
  });

  // Limpiar los campos después de agregar los datos
  limpiarInputs();
}

async function traerBus() {
  let res = await useBus.getBus();
  console.log(res);
  data.value = res.data.bus;
}

let editBus = ref(null); // Agrega esta variable en la parte superior de tu código.

function editarBus(bus) {
  editBus.value = bus;
  editNumBus.value = bus.numBus;
  editConductor.value = bus.conductor;
  editCapacidad.value = bus.capacidad;
  editPlaca.value = bus.placa;
  editMarca.value = bus.marca;
}

async function lisBus() {
  let res = await useBus.getBus();
  busesActivos.value = res;
}

// Función para editar el bus seleccionado
async function actualizarBusEditado(id) {
  try {
    await useBus.updateBus(id, {
      numBus: editNumBus.value,
      conductor: editConductor.value,
      capacidad: editCapacidad.value,
      placa: editPlaca.value,
      marca: editMarca.value,
    });
    // Cerrar el modal manualmente
    const editarBusModal = document.getElementById("staticBackdrop");
    const modalBusInstance = bootstrap.Modal.getInstance(editarBusModal);
    modalBusInstance.hide();

    // Actualizar la lista de buses en la tabla.
    await lisBus();

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
async function editEstado(busesActivos) {
  try {
    if (busesActivos.estado === true) {
      await useBus.putBusEstado(busesActivos._id , false)
    } else {
      await useBus.putBusEstado(busesActivos._id , true)
    }
    
  } catch (error) {
    console.error('error en editar estado',error);
  }
}

function limpiarInputs() {
  numBus.value = 0;
  conductor.value = "";
  capacidad.value = 0;
  placa.value = "";
  marca.value = "";
  busSeleccionado.value = null;
}

onMounted(async () => {
  lisBus();
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