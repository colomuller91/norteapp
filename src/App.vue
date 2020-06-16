<template>
  <v-app>
    <transition name="fade">
      <preloader v-if="loading"/>
    </transition>

    <app-container/>

  </v-app>

</template>

<script>

import Preloader from "./components/Preloader";
const AppContainer = () => import ("./AppContainer");

export default {
  name: 'App',
  components: {
    AppContainer,
    Preloader,
  },

  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    loading:true,
    drawerItems:[
      {
        title:'Productos',
        path:'/productos',
        icon:'mdi-view-dashboard'
      },
      {
        title:'Pedidos',
        path:'/pedidos',
        icon:'mdi-format-list-checks'
      },
      {
        title:'Venta inmediata',
        path:'/venta',
        icon:'mdi-cart-outline'
      },
      {
        title:'Reporte diario',
        path:'/resumen',
        icon:'mdi-chart-bar'
      },
      {
        title:'Mis datos',
        path:'/misdatos',
        icon:'mdi-database'
      },
      {
        title:'¡INFORMACIÓN!',
        path:'/info',
        icon:'mdi-message-text-outline'
      },
    ]
  }),
  created () {
    this.$vuetify.theme.dark = false
  },
  methods:{
    clearDB(){
      window.indexedDB.deleteDatabase('chimi')
    },
    track(){
      this.$ga.page('/')
    }
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        setTimeout(() => this.loading=false, 1000)
        // run code here
      }
    }
  }

};
</script>
<style>
  .v-toolbar__content{
    height: 100px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
