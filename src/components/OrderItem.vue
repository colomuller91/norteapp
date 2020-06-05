<template>
  <v-col :cols="sizes.cols" :sm="sizes.sm" :md="sizes.md" :lg="sizes.lg">
    <v-card
            class="d-flex flex-column "
            style="box-sizing: border-box;"
            width="100%"
            height="100%"
            raised>

      <div @click="$emit('clicked',{itemdata:item})">
        <v-card-title class="d-block px-2 subtitle-1 text-center">
          {{item.value.text}}
        </v-card-title>

        <v-card-text class="title font-weight-bold" v-if="!hideDescription">
          $ {{totalAmount}}
        </v-card-text>

        <v-card-subtitle class="py-0" v-for="product in grouped">
          {{product.qty}} &#xd7; {{product.value.name}}
        </v-card-subtitle>
        <br>
      </div>
      <v-spacer></v-spacer>
      <v-card-actions class="pa-0 d-flex" align="bottom">
        <v-btn
                tile
                height="60px"
                @click="finalizeOrder"
                outlined
                class="ma-0 flex-grow-1 subtitle-1"
                style="border-color: dimgray; background-color: #eeeeee"
                color="green">
          VENDER
        </v-btn>
        <v-btn
                tile
                height="60px"
                @click="deleteOrder"
                class="ma-0 flex-grow-1 subtitle-1 border1"
                style="border-color: dimgray; background-color: #EEEEEE"
                outlined
                color="red">
          CANCELAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>

  let orderEnt;
  let salesEnt;

  import {EntityIDB} from "../storage";

  export default {
    name:'ProductItem',
    props:{
      item:{
        type: Object,
        required:true
      },
      cardWidth:{
        default:200
      },
      sizeConfig:{
        default:'normal'
      },
      hideDescription:{
        default:false
      },
    },
    data: () => ({
      itemSizes: {
        big: {
          cols: 12,
          sm: 6,
          md: 4,
          lg: 4
        },
        normal: {
          cols: 6,
          sm: 4,
          md: 3,
          lg: 3
        }
      }
    }),
    computed:{
      sizes(){
        return this.itemSizes[this.sizeConfig];
      },
      grouped(){
        let groupedItems = {};
        this.item.value.items.forEach( x => {
          if (groupedItems[x.key]) {
            groupedItems[x.key].qty++;
          }else{
            groupedItems[x.key] = {value:x.value, qty:1}
          }
        });
        return groupedItems
      },
      totalAmount(){
        let total = 0;
        this.item.value.items.forEach( x => {
            total+= Number(x.value.amount)
        });
        return total
      }
    },
    methods:{
      deleteOrder(){
        const orderKey = this.item.key
        orderEnt.removeItem(orderKey).then( () => this.$emit('orderEnded',{operation: 'Pedido cancelado!'} ) );

      },
      finalizeOrder(){
        let order = this.item;
        order.value.done = true;
        salesEnt.addItem({date: new Date, items: order.value.items});
        orderEnt.updateItem(order.value,order.key).then( () => this.$emit('orderEnded',{operation: `VENDISTE POR $${this.totalAmount}` } ) );
      }
    },
    mounted() {
      orderEnt = new EntityIDB('pedidos');
      salesEnt = new EntityIDB('ventas');
    }
  }
</script>
