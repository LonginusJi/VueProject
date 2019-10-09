<template>
  <div class='chart' id='HighChart'>
    <highcharts :options='options'></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
export default {
  data() {
    return {
      options: {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'World Population'
        },
        xAxis: {
          categories: [
            'Brazil',
            'Japan',
            'USA',
            'India',
            'China',
            'World Population',
          ],
          title: {
            text: 'Country'
          },
          labels: {
            style: {
              fontSize: 14
            }
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Population（Million）',
            align: 'high',
          },
          labels: {
            overflow: 'justify',
            style: {
              fontSize: 14
            },
          }
        },
        tooltip: {
          valueSuffix: ' Million'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true,
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '2000',
            data: [175, 127, 282, 1057, 1263, 6302]
          },
          {
            name: '2010',
            data: [196, 128, 309, 1234, 1338, 6818]
          },
          {
            name: '2018',
            data: [209, 127, 327, 1352, 1392, 7594]
          },
        ]
      }
    };
  }
};
</script>
<style>
highcharts {
  margin: 50px auto;
}
</style>