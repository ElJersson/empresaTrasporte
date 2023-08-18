<template>
 <div class="card" style="background-color: #22227cf0; border-radius: 20px ;  box-shadow: 3px 2px 22px 1px rgb(11, 12, 11);
  /* Lowering the shadow */">
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#agregarBus"
    >
      registrar nueva ruta</button
    ><br />

    <!-- modal de agregar ruta-->
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
          style="background-color: #78787df0; border-radius: 10px"
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
                <!-- input ciudad_origen de ruta -->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"
                      >Ciudad de Origen</span
                    >
                  </div>
                  <input
                    v-model="ciudad_origen"
                    type="text"
                    class="form-control"
                    aria-label="ciudad_origen"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !ciudad_origen }"
                  />
                </div>
                <!-- input ciudad_destino de ruta -->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"
                      >ciudad de destino</span
                    >
                  </div>
                  <input
                    v-model="ciudad_destino"
                    type="text"
                    class="form-control"
                    aria-label="ciudad_destino"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !ciudad_destino }"
                  />
                </div>

                <!-- input fecha_hora_origen -->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm"
                      >Fechga de salida</span
                    >
                  </div>
                  <input
                    v-model="fecha_hora_origen"
                    type="date"
                    class="form-control"
                    aria-label="fecha_hora_origen"
                    aria-describedby="inputGroup-sizing-sm"
                    :class="{ 'is-invalid': !fecha_hora_origen }"
                  />
                </div>
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
          style="background-color: #78787df0; border-radius: 10px"
        >
          <div class="modal-body">
            <!-- input ciudad de origen -->

            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm"
                  >Ciudad de origen</span
                >
              </div>
              <input
                v-model="editCiudad_origen"
                type="text"
                class="form-control"
                aria-label="ciudad_origen"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>

            <!-- input ciudad destino -->
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm"
                  >Ciudad de destino</span
                >
              </div>
              <input
                v-model="editCiudad_destino"
                type="text"
                class="form-control"
                aria-label="ciudad_destino"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>

            <!-- input fecha de origen -->
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm"
                  >Fechga de salida</span
                >
              </div>
              <input
                v-model="editFecha_hora_origen"
                type="date"
                class="form-control"
                aria-label="fecha_hora_origen"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
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
              @click="actualizarRutaEditado(editRuta._id)"
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
            <th>Ciudad Origen</th>
            <th>Ciudad Destino</th>
            <th>fecha De Salida</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Inactivo/Activo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ruta in rutasActivos" :key="ruta.id">
            <td>{{ ruta.ciudad_origen }}</td>
            <td>{{ ruta.ciudad_destino }}</td>
            <td>{{ ruta.fecha_hora_origen }}</td>
            <td>
              <span v-if="ruta.estado" style="color: green">Activo</span>
              <span v-else style="color: red">Inactivo</span>
            </td>
            <td>
              <!-- boton  modal editar ruta -->
              <button
                style="border-radius: 10px"
                type="button"
                @click="editarRuta(ruta)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="fa-solid fa-pen fa-lg" style="color: #000000"></i>
              </button>
            </td>
             <td>
              <label class="switch"> 
                <!--  -->
                <input @click="editEstado(ruta)" v-model="ruta.estado" :checked="ruta.estado" type="checkbox"  />
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
import { useRutasStore } from "../almacenaje/rutas.js";


//variable tienda conductores
const useRuta= useRutasStore();

//variables modal agregar
let ciudad_origen = ref("");
let ciudad_destino = ref("");
let fecha_hora_origen = ref(Date);
let estado = ref(true);


let rutaSeleccionado = ref(null);

let data = ref([]);

//variables modal editar
let editCiudad_origen = ref("");
let editCiudad_destino = ref("");
let editFecha_hora_origen = ref(Date);

const rutasActivos = ref([]);


async function guardar() {
  // Realizar validaciones
  if (
    !ciudad_origen.value ||
    !ciudad_destino.value ||
    !fecha_hora_origen.value
  ) {
    // Mostrar una alerta temporal de error en caso de campos vacíos
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, completa todos los campos.",
    });
    return;
  }

  let r = await useRuta.addRuta({
    ciudad_origen: ciudad_origen.value,
    ciudad_destino: ciudad_destino.value,
    fecha_hora_origen: fecha_hora_origen.value
      });
  await lisRuta();

  // Mostrar una alerta temporal de éxito
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "Los datos se agregaron con éxito.",
  }).then((result) => {
    if (result.isConfirmed) {
    // Cerrar el modal manualmente
      const agregarRutaModal = document.getElementById("agregarBus");
      const modalRutaInstance = bootstrap.Modal.getInstance(agregarRutaModal);
      modalRutaInstance.hide();
    }
  });

  // Limpiar los campos después de agregar los datos
  limpiarInputs();
}

async function traerRuta() {
  let res = await useRuta.getRuta();
  console.log(res);
  data.value = res.data.rutas;
}

let editRuta = ref(null); // Agrega esta variable en la parte superior de tu código.

function editarRuta(ruta) {
  editRuta.value = ruta;
  editCiudad_origen.value = ruta.ciudad_origen;
  editCiudad_destino.value = ruta.ciudad_destino;
  editFecha_hora_origen.value = ruta.fecha_hora_origen;
  editEstado.value = ruta.estado;
}


const lisRuta = async()=>{
  rutasActivos.value =await useRuta.getRuta();
 console.log(rutasActivos.value);
}

// Función para editar el conductor seleccionado
async function actualizarRutaEditado(id) {
  try {
    await useRuta.updateRuta(id, {
      ciudad_destino: editCiudad_destino.value,
      ciudad_origen: editCiudad_origen.value,
      fecha_hora_origen: editFecha_hora_origen.value,
    });
    // Cerrar el modal manualmente
    const editarRutaModal = document.getElementById("staticBackdrop");
    const modalRutaInstance =bootstrap.Modal.getInstance(editarRutaModal);
    modalRutaInstance.hide();

    // Actualizar la lista de buses en la tabla.
    await lisRuta();

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

async function editEstado(rutasActivos) {
  try {
    if (rutasActivos.estado === true) {
      await useRuta.putRutaEstado(rutasActivos._id , false)
    } else {
      await useRuta.putRutaEstado(rutasActivos._id , true)
    }
    
  } catch (error) {
    console.error('error en editar estado',error);
  }
}

function limpiarInputs() {
  ciudad_destino.value = "";
  ciudad_origen.value = "";
  fecha_hora_origen.value = "";
  estado.value = "";
  rutaSeleccionado.value = null;
}

onMounted(async () => {
lisRuta()
}); 

</script>

<style>
.centrar {
  display: flex;
  justify-content: center;
}

/* Estilos del contenedor con scroll */
.table-container {
  max-height: 400px; /* Altura máxima del contenedor, ajusta según tus necesidades */
  overflow-y: auto; /* Habilitar el scroll vertical */
  /* Agregar otros estilos según sea necesario */
}
</style>