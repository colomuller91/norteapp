<template>
    <v-container fluid onresize="onresize" class="pa-sm-0 py-md-0 px-md-2">
        <v-row>
            <v-col cols="12" md="6">
                <VueApexCharts />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  let productEnt;
  let salesEnt;
  import {EntityIDB} from '../storage'
  import VueApexCharts from 'vue-apexcharts'

  export default {
    name: 'ProductList',
    components:{
        VueApexCharts
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
