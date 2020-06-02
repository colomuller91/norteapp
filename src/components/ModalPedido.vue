<template>
    <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            onresize="onresize"
            transition="dialog-bottom-transition"
    >
        <v-card tile>
            <v-toolbar
                    flat
                    dark
                    color="primary"
            >
                <v-btn
                        icon
                        dark
                        @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Datos del pedido</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                            dark
                            text
                            @click="dialog = false"
                    >
                        Guardar
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-row>

                <v-col cols="12" v-if="$vuetify.breakpoint.name == 'xs'">
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
                                             @clicked="$store.dispatch('addItem',$event.itemdata)" />
                            </v-row>
                        </v-tab-item>
                        <v-tab-item>
                            <div>
                                <v-card class="ma-3" raised v-for="item,i in $store.getters.groupedCart" @click="$store.dispatch('removeItem',i)">
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
            </v-row>

            <v-col cols="12" class="py-0" v-else>
                <v-row no-gutters>
                    <v-col cols="7"
                           md="8"
                           lg="9"
                           class="py-4"
                           :style="'overflow-y: auto; max-height:'+customHeight">
                        <p>PRODUCTOS</p>
                        <div class="d-flex flex-wrap justify-start overflow-y-auto">
                            <ProductItem v-for="product in products_array"
                                         :item="product"
                                         @clicked="$store.dispatch('addItem',$event.itemdata)" />
                        </div>
                    </v-col>
                    <v-col cols="5"
                           md="4"
                           lg="3"
                           class="py-4"
                           :style="'border-left: 2px solid #c3c3c3; overflow-y: auto; max-height:'+customHeight">
                        <p>ESTE PEDIDO: $ ${{$store.getters.totalAmount}}</p>
                        <div class="overflow-y-auto" >
                            <v-card class="ma-3"
                                    raised
                                    v-for="item,i in $store.getters.groupedCart" @click="$store.dispatch('removeItem',i)">
                                <v-card-text >
                                    <p class="title text--primary mb-0 d-flex" >
                                        <span class="pr-5">{{item.qty}} x</span>
                                        <span class="grow text-left">{{item.value.name}}</span>
                                        <span>$ {{item.value.amount * item.qty}}</span>
                                    </p>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
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
            dialog:false,
            tabs:null,
            windowSize:null
        }),
        mounted() {
            this.onResize()
            productEnt = new EntityIDB('productos');
            productEnt._loaded.then( () => {
                productEnt.getAllItems()
                    .then( (res) => { this.products_array = res } )
            })
        },
        methods:{
            openModal(productData){
                this.$refs.productModal.open(productData);
            },
            onResize () {
                this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            },
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
