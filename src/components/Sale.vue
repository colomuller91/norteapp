<template>
  <v-container fluid onresize="onresize" class="pa-sm-0 py-md-0 px-md-2">
    <v-row no-gutters class="text-center">
        <template v-if="products_array.length > 0">
            <v-col cols="12" class="fill-height" align="stretch" v-if="$vuetify.breakpoint.name == 'xs'">
                <v-tabs
                        v-model="tabs"
                        centered
                        fixed-tabs
                >
                    <v-tab>PRODUCTOS</v-tab>
                    <v-tab>ESTE PEDIDO: ${{$store.getters.totalAmount}}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs">
                    <v-tab-item>
                        <v-row class="d-flex flex-wrap ">
                            <ProductItem v-for="product in products_array"
                                         :item="product"
                                         @clicked="$store.dispatch('addItem',{entidad:'venta',item:$event.itemdata})" />
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="d-flex flex-column">
                            <div class="flex-grow-1">
                                <v-card class="ma-3"
                                        raised
                                        v-for="item,i in $store.getters.ventaAgrupada" @click="$store.dispatch('removeItem',{entidad:'venta',itemId:i})">
                                    <v-card-text >
                                        <p class="title text--primary mb-0 d-flex">
                                            <span class="pr-2 text-no-wrap">{{item.qty}} x</span>
                                            <span class="flex-grow-1 overflow-hidden subtitle-1 mt-1 align-self-center text-left" style="text-overflow: ellipsis">{{item.value.name}}</span>
                                            <span class="text-no-wrap">$ {{item.value.amount * item.qty}}</span>
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </div>
                            <div v-if="$store.getters.totalAmount > 0">
                                <br>
                                <div class="d-flex">
                                    <v-btn
                                            style="height: 50px"
                                            tile
                                            text
                                            outlined
                                            color="green"
                                            @click="makeSale"
                                            class="flex-grow-1 ma-1 pa-0">
                                        VENDER
                                    </v-btn>
                                    <v-btn
                                            style="height: 50px"
                                            tile
                                            text
                                            outlined
                                            color="red"
                                            @click="clearSale"
                                            class="flex-grow-1 ma-1 pa-0">
                                        LIMPIAR
                                    </v-btn>
                                </div>
                                <br>
                            </div>
                        </div>

                    </v-tab-item>
                </v-tabs-items>
            </v-col>
            <v-col cols="12" class="pa-0" v-else>
                <v-row no-gutters>
                    <v-col cols="7"
                           md="8"
                           lg="8"
                           class="py-4"
                           :style="'overflow-y: auto; max-height:'+customHeight">
                        <p>PRODUCTOS</p>
                        <div class="d-flex flex-wrap justify-start overflow-y-auto">
                            <ProductItem v-for="product in products_array"
                                         :item="product"
                                         @clicked="$store.dispatch('addItem',{entidad:'venta',item:$event.itemdata})" />
                        </div>
                    </v-col>
                    <v-col cols="5"
                           md="4"
                           lg="4"
                           class="py-4"
                           :style="'border-left: 2px solid #c3c3c3; overflow-y: auto; max-height:'+customHeight">
                        <p>ESTA VENTA: ${{$store.getters.totalAmount}}</p>
                        <div class="overflow-y-auto" >
                            <div class="d-flex" v-if="$store.getters.totalAmount > 0">
                                <br>
                                <v-btn
                                        style="height: 50px"
                                        tile
                                        text
                                        outlined
                                        color="green"
                                        @click="makeSale"
                                        class="flex-grow-1 ma-1 pa-0">
                                    VENDER
                                </v-btn>
                                <v-btn
                                        style="height: 50px"
                                        tile
                                        text
                                        outlined
                                        color="red"
                                        @click="clearSale"
                                        class="flex-grow-1 ma-1 pa-0">
                                    LIMPIAR
                                </v-btn>
                                <br>
                            </div>
                            <v-card class="ma-3"
                                    raised
                                    v-for="item,i in $store.getters.ventaAgrupada" @click="$store.dispatch('removeItem',{entidad:'venta',itemId:i})">
                                <v-card-text >
                                    <p class="title text--primary mb-0 d-flex">
                                        <span class="pr-2 text-no-wrap">{{item.qty}} x</span>
                                        <span class="flex-grow-1 overflow-hidden subtitle-1 mt-1 align-self-center text-left"
                                              style="text-overflow: ellipsis; white-space: nowrap">
                                            {{item.value.name}}
                                        </span>
                                        <span class="text-no-wrap">$ {{item.value.amount * item.qty}}</span>
                                    </p>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </template>
        <template v-else>
            <v-col cols="12">
                <br><br>
                <p class="title">
                    Todavía no tenés productos para vender.
                </p>
                <router-link to="productos" class="headline font-weight-bold" tag="a">Ir a productos</router-link>
            </v-col>
        </template>
    </v-row>
    <v-snackbar
            :timeout="5000"
            @close="this.textOperation=''"
            color="primary"
            v-model="snackbar"
            class="text-center">
        <p class="text-center flex-grow-1 mb-0 title">
            {{textOperation}}
        </p>
    </v-snackbar>
  </v-container>
</template>

<script>
  let productEnt;
  let salesEnt;
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
      tabs:null,
      windowSize:null,
      snackbar:false,
      textOperation:''
    }),
    mounted() {
      this.onResize()
      productEnt = new EntityIDB('productos');
      productEnt._loaded.then( () => {
        productEnt.getAllItems('name')
                .then( (res) => { this.products_array = res } )
      });

      salesEnt = new EntityIDB('ventas');
    },
    methods:{
      openModal(productData){
        this.$refs.productModal.open(productData);
      },
      operationDone(text){
        this.snackbarText = text;
        this.snackbar=true;
        productEnt._loaded.then( () => {
            productEnt.getAllItems()
                      .then( (res) => { this.products_array = res } )
        })
      },
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
      makeSale () {
          salesEnt.addItem({date:new Date(), items: this.$store.state.ventaInmediata}).then( () => {
              this.textOperation = `VENTA REALIZADA POR $${this.$store.getters.totalAmount}`;
              this.snackbar = true;
              this.clearSale()
          })
      },
      clearSale () {
          this.tabs = 0;
          this.$store.dispatch('clearVenta');
      }
    },
    computed:{
      customHeight(){
          if (this.windowSize){
            return this.windowSize.y - this.$vuetify.application.top + 'px'
          }
          return window.innerHeight - this.$vuetify.application.top + 'px'
      }
    }
  }
</script>
