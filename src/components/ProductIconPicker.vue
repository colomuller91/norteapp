<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="d-flex justify-space-between" :class="{'justify-space-around':borrar}">
          <span class="headline" v-if="!borrar">Detalle de producto</span>
          <template v-if="productId > 0">
            <v-btn tile outlined color="red" v-if="!borrar" @click="borrar=true">BORRAR</v-btn>
            <v-btn tile  color="red" class="white--text" v-if="borrar" @click="deleteProd">¿Estás seguro?</v-btn>
          </template>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nombre de producto" v-model="product.name"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                        prefix="$"
                        label="Precio"
                        v-model="product.amount"/>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                        rows="2"
                        label="Descripción"
                        hint="Descripción del producto"
                        v-model="product.description"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text class="pb-0">
          <v-list>
            <v-list-item dense v-for="errorItem in errorList"><p class="red--text text--darken-2 mb-0">{{errorItem}}</p></v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="pa-10 pt-5 justify-sm-space-between d-flex">
          <v-btn
                  color="red darken-1 white--text"
                  style="height: 50px"
                  tile
                  outlined
                  class="flex-grow-1 flex-sm-grow-0 title"
                  @click="closeModal">
            CERRAR
          </v-btn>
          <v-btn
                  color="green darken-1 white--text"
                  style="height: 50px"
                  tile
                  outlined
                  class="flex-grow-1 flex-sm-grow-0 title"
                  @click="saveProduct">
            GUARDAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  let productEnt;
  import {EntityIDB} from '../storage'
  export default {
    name: 'ProductDetails',
    data: () => ({
      dialog:false,
      productId:0,
      product:{
        name:'',
        description:'',
        amount:0.00,
      },
      errorList:[],
      borrar:false
    }),
    methods:{

      open(itemdata){

        this.dialog = true;
        this.product = {...itemdata.value};
        this.productId = itemdata.key || 0;

      },

      saveProduct(){

        let productData = {...this.product};
        productData = this.verifyData(productData)
        if ( productData.hasError ){
          this.errorList = productData.errors;
          return
        }
        let operation;
        if (this.productId === 0){
          operation = productEnt.addItem(productData);
        }else{
          operation = productEnt.updateItem(productData,this.productId);
        }
        operation.then( () => { this.$emit('realized',{operation: this.productId === 0 ? 'creado' : 'modificado'}); this.closeModal()} );
      },

      verifyData(dataObj){

        let errObj = {hasError:false, errors:[]};

        if (isNaN(dataObj.amount)){
          errObj.errors.push('El precio debe ser un número');
          errObj.hasError = true
        }else{
          dataObj.amount = Number(dataObj.amount)
        }

        if (dataObj.name.trim() == ''){
          errObj.errors.push('El nombre no puede ser vacío');
          errObj.hasError = true
        }

        return errObj.hasError ? errObj : dataObj

      },

      closeModal(){
        this.dialog = false;
        this.borrar = false;
        this.errorList = [];
      },

      deleteProd(){
        this.borrar = false;
        productEnt.removeItem(this.productId).then( () => {
          this.dialog = false;
          this.errorList = [];
          this.$emit('deleted')
        })
      }

    },
    mounted(){
      productEnt = new EntityIDB('productos');
      productEnt._loaded.then( () => {
          productEnt.getAllItems()
                    .then( (res) => { this.items = res } )
      })
    },

    watch:{
      borrar(v){
        if (v) {
          setTimeout(() => { this.borrar = false}, 6000)
        }
      }
    }
  }
</script>
