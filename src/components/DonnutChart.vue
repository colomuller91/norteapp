<template>
    <apexcharts type="donut" width="100%" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
          name: 'DonnutChart',
          components: {
              apexcharts: VueApexCharts,
          },
          data: () => ({
              series: [44, 55, 41, 17, 15],
              chartOptions: {
                  chart: {
                      type: 'donut',
                  },
                  legend:{
                      show:false
                  },
                  responsive: [{
                      breakpoint: 480,
                      options: {
                          chart: {
                              width: 200
                          },
                          legend: {
                              position: 'bottom'
                          }
                      }
                  }]
              }
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
