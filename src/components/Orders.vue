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
                         @orderEnded="operationDone($event.operation)"
                         @clicked="openModal($event.itemdata)"/>
          </div>
        </v-col>
        <v-col cols="12" v-else>
            <br><br>
            <p class="title">
                No tenés ningún pedido activo.
                <br><br>
                <span class="display-1 ">¯\_(ツ)_/¯</span>
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
    <v-snackbar :timeout="3000" color="primary" v-model="snackbar">
      <p class="text-center flex-grow-1 mb-0 title">
          {{snackbarText}}
      </p>
    </v-snackbar>

  </v-container>
</template>

<script>
  let ordersEnt;
  let productsEnt;
  import OrderItem from "./OrderItem";
  import ModalPedido from "./OrderModal";
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
                  .then( (res) => { this.orders_array = res } )
          })
      }
    }
  }
</script>
