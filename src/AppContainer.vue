<template>
  <div>

    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
    >
      <br>
      <v-toolbar-title class="text-center text-wrap ma-2" style="font-family: 'Kalimati'">Gracias por usar<br>NorteApp</v-toolbar-title>
      <br>
      <v-spacer/>
      <v-list dense>
        <v-list-item v-for="section in drawerItems" link :to="section.path">
          <v-list-item-action>
            <v-icon>{{section.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{section.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar
            app
            clipped-left
            color="#ead37a"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <p class="display-1 mb-0" style=" margin-left: -48px">
        <img :src="require('@/assets/logonortecom.png')" style="height: 70px; margin-top:4px; vertical-align: sub" />
      </p>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

  </div>

</template>

<script>

export default {
  name: 'AppContainer',
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
