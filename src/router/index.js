import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/productos',
  },
  {
    path: '/venta',
    name: 'Venta',
    component: () => import('../components/Venta.vue')
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import('../components/Pedidos.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import('../components/ProductList.vue')
  },
  {
    path: '/resumen',
    name: 'Resumen',
    // redirect: '/',
    component: () => import('../components/Statistics.vue')
  },
  {
    path: '/info',
    name: 'Información',
    component: () => import('../components/Info.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
