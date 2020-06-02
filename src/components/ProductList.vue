<template>
  <v-container fluid class="mb-10">
    <v-row class="text-center">
        <v-col cols="12">
            <p class="display-1">Productos disponibles</p>
        </v-col>
        <v-col cols="12" v-if="products_array.length>0">
          <div class="d-flex flex-wrap justify-start">
            <ProductItem v-for="product in products_array"
                         :item="product"
                         @clicked="openModal($event.itemdata)"/>
          </div>
        </v-col>
        <v-col cols="12" v-else>
            <br><br>
            <p class="title">
                Aún no creaste ningún producto en este dispositivo <v-icon>mdi-emoticon-sad-outline</v-icon>
                <br><br>
                <a class="headline font-weight-bold" @click="openModal({})">Crear producto!</a>
            </p>
        </v-col>
      </v-row>
      <v-btn
              color="primary"
              dark
              big
              right
              fixed
              bottom
              rounded
              fab
              @click="openModal({})"
              class=""
      >
          <v-icon>mdi-plus</v-icon>
      </v-btn>
    <ProductDetails
            ref="productModal"
            @realized="operationDone($event.operation,false)"
            @deleted="operationDone('',true)"/>
    <v-snackbar
            :timeout="3000"
            :color="snackbarColor"
            v-model="snackbar">
        <p class="flex-grow-1 mb-0 text-center title">
            {{snackbarText}}
        </p>
    </v-snackbar>

  </v-container>
</template>

<script>
  let productEnt;
  import ProductItem from "./ProductItem";
  import ProductDetails from "./ProductDetails";
  import {EntityIDB} from '../storage'

  export default {
    name: 'ProductList',
    components:{
      ProductDetails,
      ProductItem
    },
    data: () => ({
      products_array:[],
      productDetailsModal:false,
      snackbar:false,
      snackbarText:'',
      snackbarColor:''
    }),
    mounted() {
      productEnt = new EntityIDB('productos');
      productEnt._loaded.then( () => {
        productEnt.getAllItems('name')
                .then( (res) => { this.products_array = res } )
      })
    },
    methods:{
      openModal(productData){
        this.$refs.productModal.open(productData);
      },
      operationDone(text,deleted = false){
        if (!deleted){
          this.snackbarText = `¡Producto ${text}!`
          this.snackbarColor = 'primary'
        }else{
          this.snackbarText = '¡Producto eliminado!'
          this.snackbarColor = 'error'
        }
        this.snackbar=true;
        productEnt._loaded.then( () => {
            productEnt.getAllItems('name')
                      .then( (res) => { this.products_array = res } )
        })
      }
    }
  }
</script>
