<template>
    <div id="chart">
        <apexcharts type="donut" width="100%" class="mx-auto" style="max-width: 400px" :options="chartOptions" :series="series"></apexcharts>
    </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
          name: 'DonnutChart',
          components: {
              apexcharts: VueApexCharts,
          },
          data: () => ({
              chartOptions: {
                  chart: {
                      type: 'donut',
                  },
                  legend:{
                      show:false
                  },

              },
              series: [],
          }),
          methods:{
              setData(fields,data){
                  this.series = [...data];
                  this.chartOptions = {
                      labels: [...fields]
                  }
              }
          }
  }
</script>
