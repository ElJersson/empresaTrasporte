import Home from "../components/Home.vue";
import login from "../components/login.vue";
import tikete from "../components/tikete.vue";
import busesre from "../components/busesre.vue";
import choferre from "../components/choferre.vue";
import clientes from "../components/clientes.vue";
import rutass from "../components/rutass.vue";
import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    {path:"/" , component:login},
    {path:"/home", component:Home, children:[
        {path:"/tikete", component:tikete},
        {path:"/busesre", component:busesre},
        {path:"/choferre", component:choferre},
        {path:"/clientes", component:clientes},
        {path:"/rutass",component:rutass}
    ]
    }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
