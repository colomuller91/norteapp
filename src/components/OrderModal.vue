<template>
    <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay

            transition="dialog-bottom-transition"
    >
        <v-card tile onresize="resize">
            <v-toolbar
                    ref="toolbar"
                    flat
                    dark
                    color="primary"
            >
                <v-btn
                        icon
                        dark
                        @click="closeModalPedido"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Datos del pedido</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="orderId > 0 && $store.getters.totalOrderAmount > 0">
                    <v-btn
                            dark
                            color="blue"
                            @click="finalizeOrder"
                    >
                        VENDER
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items v-if="products_array.length > 0 && $store.getters.totalOrderAmount > 0">
                    <v-btn
                            dark
                            text
                            @click="saveOrder"
                    >
                        Guardar
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container fluid class="pb-0">
                <v-row ref="rowComentario" no-gutters class="">
                    <v-col cols="12" sm="6">
                        <v-textarea
                                class="pa-4"
                                no-resize
                                prepend-inner-icon="mdi-comment"
                                @blur="$store.dispatch('setTextPedido',$event.target.value)"
                                :value="$store.state.pedido.text"
                                label="Comentario"
                                rows="2"/>
                    </v-col>
                </v-row>
                <v-row ref="orderSelection" no-gutters>
                    <v-col cols="12" v-if="$vuetify.breakpoint.name == 'xs'">
                        <v-tabs
                                v-model="tabs"
                                centered
                                fixed-tabs
                        >
                            <v-tab>PRODUCTOS</v-tab>
                            <v-tab>ESTE PEDIDO: ${{$store.getters.totalOrderAmount}}</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tabs">
                            <v-tab-item>
                                <div class="d-flex flex-wrap justify-start">
                                    <ProductItem v-for="product in products_array"
                                                 :item="product"
                                                 @clicked="$store.dispatch('addItem',{entidad:'pedido',item:$event.itemdata})" />
                                </div>
                            </v-tab-item>
                            <v-tab-item>
                                <div>
                                    <v-card class="ma-3" raised v-for="item,i in $store.getters.pedidoAgrupado" @click="$store.dispatch('removeItem',{entidad:'pedido', itemId:i})">
                                        <v-card-text >
                                            <p class="title text--primary mb-0 d-flex" >
                                                <span class="pr-5">{{item.qty}} x</span>
                                                <span class="grow text-left">{{item.value.name}}</span>
                                                <span>$ {{item.value.amount * item.qty}}</span>
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>

                    <v-col cols="12" class="pa-0" v-else>
                        <v-row no-gutters>
                            <v-col cols="7"
                                   md="8"
                                   class="py-4"
                                   :style="'overflow-y: auto; max-height:' + customHeight">
                                <p class="text-center">PRODUCTOS</p>
                                <div class="d-flex flex-wrap justify-start overflow-y-auto">
                                    <ProductItem v-for="product in products_array"
                                                 :item="product"
                                                 @clicked="$store.dispatch('addItem',{entidad:'pedido',item:$event.itemdata})" />
                                </div>
                            </v-col>
                            <v-col cols="5"
                                   md="4"
                                   class="py-4"
                                   :style="'border-left: 2px solid #c3c3c3; overflow-y: auto; max-height:'+customHeight">
                                <p class="text-center">ESTE PEDIDO: ${{$store.getters.totalOrderAmount}}</p>
                                <div class="overflow-y-auto" >
                                    <v-card class="ma-3"
                                            raised
                                            v-for="item,i in $store.getters.pedidoAgrupado" @click="$store.dispatch('removeItem',{entidad:'pedido', itemId:i})">
                                        <v-card-text >
                                            <p class="title text--primary mb-0 d-flex" >
                                                <span class="pr-5">{{item.qty}} x</span>
                                                <span class="flex-grow-1 overflow-hidden subtitle-1 mt-1 align-self-center text-left"
                                                      style="text-overflow: ellipsis; white-space: nowrap">
                                                    {{item.value.name}}
                                                </span>
                                                <span>$ {{item.value.amount * item.qty}}</span>
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>


<script>
    let productEnt;
    let orderEnt;
    let salesEnt;
    import ProductItem from "./ProductItem";
    import {EntityIDB} from '../storage'

    export default {
        name: 'ModalPedido',
        components:{
            ProductItem
        },
        data: () => ({
            products_array:[],
            orderId:0,
            dialog:false,
            tabs:null,
            windowSize:null,
            customHeight:'0px'
        }),
        mounted() {
            productEnt = new EntityIDB('productos');
            productEnt._loaded.then( () => {
                productEnt.getAllItems()
                    .then( (res) => { this.products_array = res } )
            })
            orderEnt = new EntityIDB('pedidos');

            salesEnt = new EntityIDB('ventas');
        },
        methods:{
            open(orderData){
                const auxData = {...orderData}
                this.dialog=true
                if (auxData.key){
                    this.tabs=1;
                    this.orderId = auxData.key;
                    this.$store.dispatch('setPedido',{key:auxData.key, ...auxData.value})
                }else{
                    this.tabs=0;
                    this.orderId = auxData.key;
                    this.$store.dispatch('clearPedido')
                }
                // this.$refs.productModal.open(productData);
            },
            resize () {
                this.$nextTick( async () => {
                    await this.$refs.rowComentario;
                    this.customHeight = window.innerHeight - (this.$refs.rowComentario.offsetTop + this.$refs.rowComentario.offsetHeight) + 'px'
                })
            },
            saveOrder(){
                let operation;
                if (this.orderId>0){
                    operation = orderEnt.updateItem({done:0, ...this.$store.state.pedido},this.orderId);
                }else{
                    operation = orderEnt.addItem({date:new Date, done:0, ...this.$store.state.pedido});
                }
                operation.then( () => { this.$emit('realized',{operation: this.orderId === 0 ? 'Pedido creado!' : 'Pedido modificado!'}); this.dialog=false} );
            },
            finalizeOrder(){
                let order = this.$store.state.pedido;
                order.done = 1;
                salesEnt.addItem({date: new Date, items: order.items});
                orderEnt.updateItem(order,order.key).then( () => {
                    this.$emit('realized',{operation: `Vendiste por: $${this.$store.getters.totalOrderAmount}`});
                    this.closeModalPedido();
                });
            },
            closeModalPedido(){
                this.dialog = false;
                this.$store.dispatch('clearPedido');
            }
        },
        watch:{
            dialog(val){
                if (val){
                    this.resize()
                }
            }
        },

        computed:{
            offsetTop(){
                if (!this.$refs.rowComentario) {
                    return ''
                } else{
                    return window.innerHeight - (this.$refs.rowComentario.offsetTop + this.$refs.rowComentario.offsetHeight) + 'px'
                }
            },

        }
    }
</script>
