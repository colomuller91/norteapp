<template>

</template>

<script>
    let productEnt, salesEnt, ordersEnt;

    import {EntityIDB} from '../storage'

    export default {
        name: "UserDataResume",
        data:() => ({
            productsCount:0,
            sales:[],
            orders:[],
        }),
        mounted(){
            productEnt = new EntityIDB('productos');
            productEnt._loaded.then( () => {
                productEnt.countItems()
            })

            salesEnt = new EntityIDB('ventas');
            salesEnt._loaded.then( () => {
                this.sales = this.getAllItems();
            })

            ordersEnt = new EntityIDB('pedidos');
            ordersEnt._loaded.then( () => {
                this.orders = this.getAllItems();
            })
        }
    }
</script>

<style scoped>

</style>
