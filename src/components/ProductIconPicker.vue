<template>
  <v-container class="pa-10">
    <v-dialog v-model="dialog" max-width="600px">
      <div style="background-color: white" class="ma-0 pa-10">
        <p class="text-center title">Seleccionar un ícono</p>
        <v-row no-gutters>
          <v-col cols="3" md="2" v-for="icon in icons" align="start">
            <div class="d-flex align-stretch pa-3">
              <v-img @click="iconselected(icon)" contain max-height="100px" class="pa-3" :src="require(`@/assets/icons/${icon}.png`)"/>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: 'IconPicker',
    data: () => ({
      dialog:false,
      icons:[
        'beer',
        'bottle',
        'coffee',
        'croissant',
        'drink',
        'empanada',
        'food',
        'pizza',
        'sandwich'
      ]
    }),
    methods:{
      iconselected(icon){
        this.$emit('iconselected',icon);
        this.dialog=false;
      },
      open(){
        this.dialog=true;
      }
    }
  }
</script>
