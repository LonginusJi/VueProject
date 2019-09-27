<template>
  <div class="chart" id="HighChart">
    <highcharts :options="options" ref="highcharts"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
export default {
  data() {
    return {
      options: {
        chart: {
          type: "bar"
        },
        title: {
          text: "World Population"
        },
        xAxis: {
          categories: ["Brazil", "Indonesia", "USA", "India", "China", "World Population<br>(Ten thousand)"],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Population（Million）",
            align: "high"
          },
          labels: {
            overflow: "justify"
          }
        },
        tooltip: {
          valueSuffix: " millions"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "2011",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "2012",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
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