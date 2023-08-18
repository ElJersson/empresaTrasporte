<template>
  <div>
    <div class="col-6">
      <div
        class="card"
        style="background-color: #303082f0; border-radius: 20px"
      >
        <div class="card-body">
          <h5>selecciona ruta</h5>
          <select
            :class="{ 'is-invalid': !origenSeleccionado }"
            class="form-select"
            id="origen"
            v-model="origenSeleccionado"
          >
            <option
              v-for="ruta in rutas"
              :key="ruta.ciudad_origen"
              :value="ruta"
            >
              {{ ruta.ciudad_origen }} - {{ ruta.ciudad_destino }}
            </option>
          </select>
          <br />
          <h5>Seleccionar bus</h5>
          <select
            :class="{ 'is-invalid': !busSeleccionado }"
            class="form-select"
            id="bus"
            v-model="busSeleccionado"
          >
            <option v-for="bus in busesActivos" :key="bus.numBus" :value="bus">
              {{ bus.placa }} - {{ bus.marca }}
            </option>
          </select>

          <!-- ... (código previo) ... -->
          <br />
          <!-- input fecha de llegada -->
          <div
            v-if="origenSeleccionado"
            class="card"
            style="background-color: #303082f0; border-radius: 20px"
          >
            <div class="card-body">
              <h5>
                Fecha y Hora de salida:
                {{ origenSeleccionado.fecha_hora_origen }}
              </h5>
            </div>
          </div>

          <button
            type="button"
            class="centrar btn btn-success"
            data-bs-dismiss="modal"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <div class="col-6">
      <div
        v-if="busSeleccionado"
        class="card"
        style="
          margin-top: 20px;
          background-color: #303082f0;
          border-radius: 20px;
        "
      >
        <div class="card-body">
          <h5>Asientos disponibles</h5>

          <div class="seat-grid">
            <button
              v-for="seatNumber in busSeleccionado.capacidad"
              :key="seatNumber"
              class="seat-button btn"
              data-bs-toggle="modal"
              data-bs-target="#agregarDatosModal"
            >
              <img src="./armchair.png" style="width: 30px; height: 30px" />
              {{ seatNumber }}
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="agregarDatosModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content" style="background-color: rgb(39, 39, 132)">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Agregar Datos</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                v-model="cc"
                type="text"
                class="form-control"
                placeholder="Cédula"
              /><br />
              <input
                placeholder="pago total"
                v-model="pago_total"
                type="number"
                class="form-control"
                aria-label="fecha de llegada"
                aria-describedby="inputGroup-sizing-sm"
              /><br />
            </div>
            <div class="modal-footer">
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="comprarBoleto"
                >
                  Comprar Boleto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useClienteStore } from "../almacenaje/clientes.js";
import { useRutasStore } from "../almacenaje/tiketes.js";
import { useBusStore } from "../almacenaje/bus.js";
const pago_total = ref("");
const fechasalida = ref("");
const telefono = ref("");
const cc = ref("");
const apellido = ref("");
const nombre = ref("");
const useBus = useBusStore();
const rutasStore = useRutasStore();
const origenSeleccionado = ref("");
const busSeleccionado = ref("");
const busesActivos = ref([]);
let rutas = ref([]);

const clienteStore = useClienteStore();
async function comprarBoleto() {
  // Verify if the entered cedula matches an existing client
  const existingClient = clienteStore.getClientePorCedula(cc);

  if (existingClient) {
    // Proceed with the purchase logic here
    // ...

    // Close the modal after purchase
    const modalElement = document.getElementById("agregarDatosModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  } else {
    // Display a message that the cedula is not registered
    console.log("Cedula is not registered");
  }
}

// ... Otras variables y funciones ...
async function listRutas() {
  let r = await rutasStore.getCiudades();
  console.log(r);
  rutas.value = r.data.rutas.map((route) => {
    return {
      ...route,
      fecha_hora_origen: route.fecha_hora_origen, // Assuming this is the departure time field
    };
  });
}

onMounted(async () => {
  await rutasStore.getCiudades();
  await listRutas();
});
// ... Otras variables y funciones ...
async function listBus() {
  let res = await useBus.getBus();
  console.log(res);
  busesActivos.value = res;
}

onMounted(async () => {
  await useBus.getBus();
  await listBus();
});
</script>

<style>
.seat-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    60px
  ); /* Ancho de las columnas de asientos */
  gap: 5px; /* Espacio entre asientos */
  justify-content: center;
}

.card-container {
  display: flex;
  justify-content: space-between;
}

/* Estilo para la etiqueta del número del asiento */
.centrar {
  display: flex;
  justify-content: center;
}

.seat-button {
  width: 50px; /* Ancho fijo para los botones */
  height: 50px; /* Alto fijo para los botones */
  margin: 2px;
  padding: 5px 10px;
  background-color: #4caf50;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0);
  cursor: pointer;
}
.centrar {
  display: flex;
  justify-content: center;
}
</style>