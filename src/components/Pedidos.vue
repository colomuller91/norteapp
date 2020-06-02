<template>
  <v-container fluid class="mb-10">
    <v-row class="text-center">
        <v-col cols="12" >
            <p class="display-1" v-if="orders_array.length>0">Pedidos en curso</p>
        </v-col>
        <v-col cols="12" v-if="orders_array.length>0">
          <div class="d-flex flex-wrap justify-start">
            <OrderItem v-for="order in orders_array"
                         size-config="big"
                         :item="order"
                         @orderEnded="loadOrders"
                         @clicked="openModal($event.itemdata)"/>
          </div>
        </v-col>
        <v-col cols="12" v-else>
            <br><br>
            <p class="title">
                ¯\_(ツ)_/¯
                <br><br>
                Aún no creaste ningún PEDIDO en este dispositivo
            </p>
        </v-col>
      </v-row>
      <v-btn
              v-if="hasProducts"
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
    <ModalPedido ref="modalPedido" @realized="operationDone($event.operation)" @orderEnded="loadOrders"></ModalPedido>
    <v-snackbar :timeout="4000" color="primary" v-model="snackbar">{{textOperation}}</v-snackbar>

  </v-container>
</template>

<script>
  let ordersEnt;
  let productsEnt;
  import OrderItem from "./OrderItem";
  import ModalPedido from "./ModalPedido";
  import {EntityIDB} from '../storage'

  export default {
    name: 'Pedidos',
    components:{
      ModalPedido,
      OrderItem
    },
    data: () => ({
      orders_array:[],
      productDetailsModal:false,
      snackbar:false,
      snackbarText:'',
      hasProducts:false,
    }),
    mounted() {
      productsEnt = new EntityIDB('productos');
      productsEnt._loaded.then(() => productsEnt.countItems().then( x => this.hasProducts = ( x > 0 ) ) )

      ordersEnt = new EntityIDB('pedidos');
      this.loadOrders()
    },
    methods:{
      openModal(orderData){
        this.$refs.modalPedido.open(Object.assign(orderData));
      },
      operationDone(text){
        this.snackbarText = text;
        this.snackbar=true;
        this.loadOrders();
      },
      loadOrders(){
          ordersEnt._loaded.then( () => {
              ordersEnt.getFilteredItems('done',{filter:'only', value:0})
                  .then( (res) => { console.log(res); this.orders_array = res } )
          })
      }
    },
    computed:{
      textOperation(){
        return `${this.snackbarText} realizada!`
      }
    }
  }
</script>
