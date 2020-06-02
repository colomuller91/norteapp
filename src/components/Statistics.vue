<template>
    <v-container fluid onresize="onresize" class="pa-sm-0 py-md-0 px-md-2">
        <v-row no-gutters>
            <v-col cols="12" sm="4">
                <div class="pa-10 pb-4 pa-sm-5">
                    <v-menu
                            v-model="datepicker"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="computedDateFormatted"
                                    label="Fecha de reporte"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                            />
                        </template>
                        <v-date-picker v-model="date" no-title @input="datepicker = false"></v-date-picker>
                    </v-menu>
                </div>
            </v-col>
            <v-col cols="12" sm="8">
                <p class="text-center display-1 pa-sm-5">Total ${{totalAmount}}</p>
            </v-col>
            <v-col cols="12" md="7" v-show="showCharts">
                <p class="text-center">
                    Montos acumulados en venta
                </p>
                <bar-chart ref="barchart"/>
            </v-col>
            <v-col cols="12" md="5" v-show="showCharts">
                <p class="text-center">
                    Cantidad de items vendidos
                </p>
                <donnut-chart ref="donnutchart"/>
            </v-col>
            <v-col cols="12" v-show="!showCharts">
                <p class="text-center"> No hay datos para mostrar en esta fecha</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  let salesEnt;
  import {EntityIDB} from '../storage'
  import BarChart from "./BarChart";
  import DonnutChart from "./DonnutChart";

  export default {
    name: 'Statistics',
    components:{
        BarChart,
        DonnutChart
    },
    data: () => ({
        datepicker:false,
        date: new Date((new Date).getTime() - ((new Date).getTimezoneOffset() * 60000)).toISOString().substr(0,10),
        totalAmount:0,
        showCharts:false
    }),
    computed: {
      computedDateFormatted () {
          return this.formatDate(this.date)
      },
    },

    watch: {
      date (newval, oldval) {
          //check if not first data
          if (oldval){
              this.getSellingData(newval);
          }
      },
    },

    methods: {
      formatDate (date) {
          if (!date) return null

          const [year, month, day] = date.split('-')
          return `${day}/${month}/${year}`
      },
      parseDate (date) {
          if (!date) return null

          const [month, day, year] = date.split('/')
          return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`
      },
      getSellingData(date){
          this.showCharts = true;
          this.totalAmount = 0;
          let productGrouped = {};
          const splitted = date.split('-');
          const date1 = new Date(Number(splitted[0]),Number(splitted[1])-1,Number(splitted[2]),0,0,0)
          const date2 = new Date(Number(splitted[0]),Number(splitted[1])-1,Number(splitted[2]),23,59,55)
          salesEnt.getFilteredItems(
              'date',
              {filter:'bound', value1:date1, value2: date2})
              .then(res => {
                  res.forEach(
                      x => {
                          this.totalAmount += this.getAmount(x)
                          x.value.items.forEach(product => {
                              if (productGrouped[product.key]){
                                  productGrouped[product.key].qty++;
                                  productGrouped[product.key].total+=product.value.amount;
                              }else{
                                  productGrouped[product.key] = {
                                      name:product.value.name,
                                      qty:1,
                                      total:product.value.amount,
                                  }
                              }
                          })
                      });
                  let sellings = [];
                  Object.keys(productGrouped).forEach( x => {
                      sellings.push({
                          name:productGrouped[x].name,
                          qty:productGrouped[x].qty,
                          total:productGrouped[x].total
                      })
                  });
                  this.showCharts = sellings.length > 0;

                  const totalSorted = [...sellings].sort( (a,b) => {return b.total - a.total});
                  const qtySorted = [...sellings].sort( (a,b) => {return b.qty - a.qty});
                  this.$refs.barchart.setData(totalSorted.map( x => x.name), totalSorted.map(x => x.total));
                  this.$refs.donnutchart.setData(qtySorted.map( x => x.name), qtySorted.map(x => x.qty));

              })

      },
      getAmount(obj){
          let amount = 0;
          obj.value.items.forEach (product => amount += product.value.amount);
          return amount;
      }
    },

    mounted() {
      salesEnt = new EntityIDB('ventas');
      salesEnt._loaded.then( () => {
          this.getSellingData(this.date)
      })
    }
  }
</script>
