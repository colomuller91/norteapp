<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12" sm="10" md="8" lg="5" class="ml-2">
                <p class="headline">Mis datos</p>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>Productos: {{productsCount}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>Pedidos creados: {{orders.length}}</v-list-item-title>
                    </v-list-item>

                    <v-list-group >
                        <template v-slot:activator>
                            <v-list-item-title>Ventas realizadas: {{salesCount}}</v-list-item-title>
                        </template>
                            <v-list-item-subtitle class="text-end">Ultimas 15</v-list-item-subtitle>

                        <v-list-item
                                v-for="(sale, i) in salesFiltered"
                                :key="i"
                                class="v-list--two-line"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="sale.date"></v-list-item-title>
                                <transition name="y-grow">
                                    <v-list-item-subtitle v-if="sale.askCancel">
                                        Cancelar venta?&nbsp;
                                        <v-btn outlined tile class="green mx-2 px-3 white--text" @click="cancelSaleById(sale.id)">SI</v-btn>
                                        <v-btn outlined tile class="red mx-2 px-3 white--text" @click="sale.askCancel=false">NO</v-btn>
                                    </v-list-item-subtitle>
                                </transition>
                            </v-list-item-content>
                            <v-list-item-action style="white-space: nowrap; ">
                                $ {{sale.total}}.00
                            </v-list-item-action>
                            <v-list-item-action v-if="sale.askCancel==false">
                                <v-icon @click="sale.askCancel=true" class="ml-4 red--text font-weight-bold">mdi-close</v-icon>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    let productEnt, salesEnt, ordersEnt;

    import {EntityIDB} from '../storage'

    export default {
        name: "UserDataResume",
        data:() => ({
            productsCount:0,
            salesCount:0,
            salesFiltered:[],
            orders:[],
        }),
        mounted(){
            productEnt = new EntityIDB('productos');
            salesEnt = new EntityIDB('ventas');
            ordersEnt = new EntityIDB('pedidos');

            productEnt._loaded.then( () => {
                productEnt.countItems().then(res => {
                    this.productsCount = res;
                })
            })

            this.getLastSales();

            ordersEnt._loaded.then( () => {
                ordersEnt.getAllItems().then( res => {
                    this.orders = res;

                }) ;
            })

        },
        methods:{
            getLastSales(){
                salesEnt._loaded.then( () => {
                    salesEnt.getAllItems().then( res => {
                        this.salesCount = res.length;
                        this.salesFiltered = res.splice(-15).reverse().map(item => {
                            return {id: item.key,
                                askCancel:false,
                                date:item.value.date.toISOString().substr(0,10).split('-').reverse().join('/') + ' ' + item.value.date.toISOString().substr(11,5),
                                total:item.value.items.reduce( (accumulator, prod) => accumulator + prod.value.amount , 0
                                )}
                        });
                    }) ;
                })
            },
            cancelSaleById(id){
                salesEnt.removeItem(id).then(
                    () => this.getLastSales()
                )
            }
        }
    }
</script>

<style scoped>


    .y-grow-enter-active, .y-grow-leave-active {
        transition: max-height .3s;
    }
    .y-grow-enter-to, .y-grow-leave {
        max-height: 100px;
    }
    .y-grow-enter, .y-grow-leave-to {
        max-height: 0px;
    }


</style>
