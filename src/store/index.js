import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ventaInmediata:[],
    pedido:{
      text:'',
      items:[]
    },
  },
  mutations: {
    ADD_ITEM_VENTA : (state, item) => {
      state.ventaInmediata.push(item)
    },
    REMOVE_ITEM_VENTA(state, itemId){
      state.ventaInmediata.splice(itemId,1);
    },
    SET_TEXT_PEDIDO : (state, text) => {
      state.pedido.text = text
    },
    ADD_ITEM_PEDIDO : (state, item) => {
      state.pedido.items.push(item)
    },
    SET_PEDIDO : (state, item) => {
      state.pedido = item
    },
    CLEAR_PEDIDO : (state) => {
      state.pedido = {items:[]}
    },
    REMOVE_ITEM_PEDIDO(state, itemId){
      state.pedido.items.splice(itemId,1);
    },
    CLEAR_VENTA : (state) => {
      state.ventaInmediata = []
    },
  },
  actions: {
    addItem: ({commit},{entidad:entidad,item:item}) => {
      switch (entidad) {
        case 'pedido':
          commit('ADD_ITEM_PEDIDO',item);
          break;
        case 'venta':
          commit('ADD_ITEM_VENTA',item);
          break;
      }
    },
    removeItem: ({commit,state},{entidad:entidad,itemId:itemId}) => {
      switch (entidad) {
        case 'pedido':
          ( state.pedido.items.findIndex(x => x.key == itemId) > -1) && commit('REMOVE_ITEM_PEDIDO',state.pedido.items.findIndex(x => x.key == itemId))
          break;
        case 'venta':
          ( state.ventaInmediata.findIndex(x => x.key == itemId) > -1) && commit('REMOVE_ITEM_VENTA',state.ventaInmediata.findIndex(x => x.key == itemId))
          break;
      }
    },
    setTextPedido({commit},text){
      commit('SET_TEXT_PEDIDO',text)
    },
    setPedido({commit},pedido){
      commit('SET_PEDIDO',pedido)
    },
    clearPedido({commit}){
      commit('CLEAR_PEDIDO')
    },
    clearVenta({commit}){
      commit('CLEAR_VENTA')
    }
  },
  getters:{
    totalAmount: state => {
      let sum = 0;
      state.ventaInmediata.forEach(x => sum += Number(x.value.amount));
      return sum;
    },
    totalOrderAmount: state => {
      let sum = 0;
      state.pedido.items.forEach(x => sum += Number(x.value.amount));
      return sum;
    },
    ventaAgrupada: state => {
      let grouped = {};
      state.ventaInmediata.forEach( x => {
        if (grouped[x.key]) {
          grouped[x.key].qty++;
        }else{
          grouped[x.key] = {value:x.value, qty:1}
        }
      })
      return grouped
    },
    pedidoAgrupado: state => {
      let grouped = {};
      state.pedido.items.forEach( x => {
        if (grouped[x.key]) {
          grouped[x.key].qty++;
        }else{
          grouped[x.key] = {value:x.value, qty:1}
        }
      })
      return grouped
    }
  },
  modules: {
  }
})
