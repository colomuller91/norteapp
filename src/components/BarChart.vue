<template>
    <div id="chart">
        <apexcharts width="100%" type="bar" :options="chartOptions" :series="series"></apexcharts>
    </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
          name: 'BarChart',
          components: {
              apexcharts: VueApexCharts,
          },
          data: () => ({
                  chartOptions: {
                      chart: {
                          type: 'bar',
                          height: 'auto'
                      },
                      legend:{
                          show:false
                      },
                      plotOptions: {
                          bar: {
                              barHeight: '100%',
                              distributed: true,
                              horizontal: true,
                              dataLabels: {
                                  position: 'bottom'
                              },
                          }
                      },
                      xaxis: {
                          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                      },
                      yaxis: {
                          show:true
                      }
                  },
                  series: [{
                      name: 'series-1',
                      data: [30, 40, 45, 50, 49, 60, 70, 12,30, 40, 45, 50, 49, 60, 70, 12]
                  }]
              }
          ),
          methods:{
              setData(fields,data){
                  this.chartOptions = {
                      xaxis: {
                          categories: [...fields]
                      },
                      chart:{
                          height: (100 + (data.length * 30)) + 'px'
                      }
                  };
                  this.series = [{
                      name: 'Monto total',
                      data: [...data]
                  }]
              }
          }
    }
</script>
