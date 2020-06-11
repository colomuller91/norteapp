<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4" class="ml-2">
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
                                @click=""
                        >
                            <v-list-item-title v-text="sale.date"></v-list-item-title>
                            <v-list-item-action style="white-space: nowrap;">
                                $ {{sale.total}}.00
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
            productEnt._loaded.then( () => {
                productEnt.countItems().then(res => {
                    this.productsCount = res;
                })
            })

            salesEnt = new EntityIDB('ventas');
            salesEnt._loaded.then( () => {
                salesEnt.getAllItems().then( res => {
                    this.salesCount = res.length;
                    this.salesFiltered = res.splice(-15).map(item => {
                        return {id: item.key,
                                date:item.value.date.toISOString().substr(0,10).split('-').reverse().join('/') + ' ' + item.value.date.toISOString().substr(11,5),
                                total:item.value.items.reduce( (accumulator, prod) => accumulator + prod.value.amount , 0
                                )}
                    });
                }) ;
            })

            ordersEnt = new EntityIDB('pedidos');
            ordersEnt._loaded.then( () => {
                ordersEnt.getAllItems().then( res => {
                    this.orders = res;

                }) ;
            })

        }
    }
</script>

<style scoped>

</style>
