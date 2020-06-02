<template>
  <v-col :cols="sizes.cols" :sm="sizes.sm" :md="sizes.md" :lg="sizes.lg">
    <v-card @click="$emit('clicked',{itemdata:item})"
            class=""
            style="box-sizing: border-box"
            width="100%"
            height="100%"
            raised>

      <v-img
              :src="require('../assets/logo.svg')"
              contain
              :height="`${cardWidth/2}px`"/>

      <v-card-title class="d-block pb-0 px-2 subtitle-1">
        {{item.value.name}}
      </v-card-title>

      <v-card-text class="pb-0" v-if="!hideDescription">
        {{item.value.description}}
      </v-card-text>

      <v-card-subtitle class="pt-3">
        ${{item.value.amount}}
      </v-card-subtitle>

    </v-card>
  </v-col>
</template>

<script>

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
      }
    }
  }
</script>
