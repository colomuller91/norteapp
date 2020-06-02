<template>
    <apexcharts width="500" height="350" type="bar" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
          name: 'Chart',
          components: {
              apexcharts: VueApexCharts,
          },
          data: function() {
              return {
                  chartOptions: {
                      chart: {
                          id: 'basic-bar'
                      },
                      xaxis: {
                          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                      }
                  },
                  series: [{
                      name: 'series-1',
                      data: [30, 40, 45, 50, 49, 60, 70, 91]
                  }]
              }
          }
  }
</script>
