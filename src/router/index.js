import Vue from 'vue'
import VueRouter from 'vue-router'
import Sale from '@/components/Sale.vue'
import Orders from '@/components/Orders.vue'
import ProductList from '@/components/ProductList.vue'
import Statistics from '@/components/Statistics.vue'
import Info from '@/components/Info.vue'
import UserDataResume from '@/components/UserDataResume.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/productos',
  },
  {
    path: '/venta',
    name: 'Venta',
    component: Sale
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Orders
  },
  {
    path: '/productos',
    name: 'Productos',
    component: ProductList
  },
  {
    path: '/resumen',
    name: 'Resumen',
    component: Statistics
  },
  {
    path: '/misdatos',
    name: 'Mis datos',
    component: UserDataResume
  },
  {
    path: '/info',
    name: 'Información',
    component: Info
  },
]

const router = new VueRouter({
  routes
})

export default router
