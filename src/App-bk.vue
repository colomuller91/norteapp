<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      cll
    >
      <v-spacer></v-spacer>
        <p class="display-1 mb-0" style="font-family: 'Bangers' !important;">Chimi-App</p>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
<!--      <HelloWorld/>-->
<!--      <HelloWorld/>-->
<!--      <HelloWorld/>-->
      <product-list/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import productsManagement from './components/ProductsManagement';
import productDetails from './components/ProductDetails';
import productList from './components/ProductList';

export default {
  name: 'App',

  components: {
    productList,
  },

  data: () => ({
    //
  }),
};
</script>
style
