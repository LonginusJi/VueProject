<template>
  <div class="container">
    <highcharts :options="options" ref="highcharts"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
export default {
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      options: {
        chart: {
          type: "bar"
        },
        title: {
          text: "世界人口总量"
        },
        subtitle: {
          text: "数据来自网络"
        },
        xAxis: {
          categories: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "人口（百万）",
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
</style>