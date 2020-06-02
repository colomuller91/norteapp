<template>
  <v-app>

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
        <v-list-item link to="/productos">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/pedidos">
          <v-list-item-action>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/venta">
          <v-list-item-action>
            <v-icon>mdi-cart-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Venta imediata</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/resumen">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reporte diario</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item link to="/info">
          <v-list-item-action>
            <v-icon>mdi-message-text-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>¡CONSULTAS!</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--<v-list-item link @click="clearDB" >
          <v-list-item-action >
            <v-icon color="red">mdi-bomb</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >BORRAR DB</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
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
        <img :src="require('@/assets/logonorte.png')" style="height: 70px; vertical-align: sub" />
      </p>
      <v-spacer></v-spacer>

    </v-app-bar>





    <v-content>
      <router-view></router-view>

    </v-content>



  </v-app>

</template>

<script>

import productList from './components/ProductList';

export default {
  name: 'App',
  components: {
    productList,
  },

  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created () {
    this.$vuetify.theme.dark = false
  },
  methods:{
    clearDB(){
      window.indexedDB.deleteDatabase('chimi')
    }
  }

};
</script>
<style>
  .v-toolbar__content{
    height: 100px;
  }
</style>
